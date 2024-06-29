import { ClientNotFoundError } from '@/use-cases/errors/client-not-found.error'
import { makeDeleteClientUseCase } from '@/use-cases/factories/make-delete-client-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteClient(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = paramsSchema.parse(request.params)

  console.log('ID: ', id)

  try {
    const deleteClientUseCase = makeDeleteClientUseCase()

    await deleteClientUseCase.execute({
      id,
    })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof ClientNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
