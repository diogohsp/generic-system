import { ClienteNotFoundError } from '@/use-cases/errors/client-not-found.error'
import { makeDeleteClientUseCase } from '@/use-cases/factories/make-delete-client-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteClient(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.coerce.bigint(),
  })

  const { id } = paramsSchema.parse(request.params)

  try {
    const deleteClientUseCase = makeDeleteClientUseCase()

    await deleteClientUseCase.execute({
      id,
    })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof ClienteNotFoundError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
