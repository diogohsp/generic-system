import { ServiceNotFoundError } from '@/use-cases/errors/service-not-found.error'
import { makeDeleteServiceUseCase } from '@/use-cases/factories/make-delete-service-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteService(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.coerce.bigint(),
  })

  const { id } = paramsSchema.parse(request.params)

  try {
    const deleteServiceUseCase = makeDeleteServiceUseCase()

    await deleteServiceUseCase.execute({
      id,
    })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof ServiceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
