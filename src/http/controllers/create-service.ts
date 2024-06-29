import { ClienteNotFoundError } from '@/use-cases/errors/client-not-found.error'
import { makeCreateServiceUseCase } from '@/use-cases/factories/make-create-service-use-case'
import { validateLicensePlate } from '@/utils/validate-license-plate'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createService(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    vehicle: z
      .string()
      .min(1, {
        message: 'O nome do veículo deve ter no mínimo 1 caracter',
      })
      .max(255, {
        message: 'O nome do veículo deve ter no máximo 255 caracteres',
      }),
    licensePlate: z.string().refine(
      (licensePlate) => {
        const isLicensePlateValid = validateLicensePlate(licensePlate)

        return isLicensePlateValid
      },
      { message: 'Placa inválida' },
    ),
    description: z.string().nullable(),
    clientId: z.coerce.number(),
  })

  const { vehicle, licensePlate, description, clientId } = bodySchema.parse(
    request.body,
  )

  try {
    const createServiceUseCase = makeCreateServiceUseCase()

    await createServiceUseCase.execute({
      vehicle,
      licensePlate,
      description,
      clientId,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof ClienteNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
