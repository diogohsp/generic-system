import { ClientAlreadyExistsError } from '@/use-cases/errors/client-already-exists.error'
import { ClientNotFoundError } from '@/use-cases/errors/client-not-found.error'
import { makeUpdateClientUseCase } from '@/use-cases/factories/make-update-client-use-case'
import { validateCpf } from '@/utils/validate-cpf'
import { validatePhone } from '@/utils/validate-phone'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateClient(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.coerce.number(),
  })

  const bodySchema = z.object({
    name: z
      .string()
      .min(3, {
        message: 'O nome do cliente deve ter no mínimo 3 caracteres',
      })
      .max(255, {
        message: 'O nome do cliente deve ter no máximo 255 caracteres',
      }),
    cpf: z
      .string()
      .transform((phone) => phone.replace(/\D/g, ''))
      .refine(
        (cpf) => {
          const isCpfValid = validateCpf(cpf)

          return isCpfValid
        },
        { message: 'CPF Inválido' },
      ),
    phone: z
      .string()
      .transform((phone) => phone.replace(/\D/g, ''))
      .refine(
        (phone) => {
          const isPhoneValid = validatePhone(phone)

          return isPhoneValid
        },
        { message: 'Telefone Inválido' },
      ),
  })

  const { id } = paramsSchema.parse(request.params)
  const { name, cpf, phone } = bodySchema.parse(request.body)

  try {
    const updateClientUseCase = makeUpdateClientUseCase()

    const { client } = await updateClientUseCase.execute({
      id,
      name,
      cpf,
      phone,
    })

    return reply.status(200).send({
      client,
    })
  } catch (error) {
    if (error instanceof ClientNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }

    if (error instanceof ClientAlreadyExistsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
