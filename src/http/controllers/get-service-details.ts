import { ServiceNotFoundError } from '@/use-cases/errors/service-not-found.error'
import { makeGetServiceDetailsUseCase } from '@/use-cases/factories/make-get-service-details-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getServiceDetails(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = paramsSchema.parse(request.params)

  try {
    const getServiceDetailsUseCase = makeGetServiceDetailsUseCase()

    const { service } = await getServiceDetailsUseCase.execute({
      id,
    })

    return reply.status(200).send({
      service,
    })
  } catch (error) {
    if (error instanceof ServiceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
