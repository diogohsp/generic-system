import { ClientAlreadyExistsError } from '@/use-cases/errors/client-already-exists.error'
import { makeCreateClientUseCase } from '@/use-cases/factories/make-create-client-use-case'
import { validateCpf } from '@/utils/validate-cpf'
import { validatePhone } from '@/utils/validate-phone'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createClient(
  request: FastifyRequest,
  reply: FastifyReply,
) {
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
      )
      .nullable(),
  })

  const { name, cpf, phone } = bodySchema.parse(request.body)

  try {
    const createClientUseCase = makeCreateClientUseCase()

    await createClientUseCase.execute({
      name,
      cpf,
      phone,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof ClientAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
