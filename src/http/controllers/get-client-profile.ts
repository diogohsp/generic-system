import { ClienteNotFoundError } from '@/use-cases/errors/client-not-found.error'
import { makeGetClientProfileUseCase } from '@/use-cases/factories/make-get-client-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getClientProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = paramsSchema.parse(request.params)

  try {
    const getClientProfileUseCase = makeGetClientProfileUseCase()

    const { client } = await getClientProfileUseCase.execute({
      id,
    })

    return reply.status(200).send({
      client,
    })
  } catch (error) {
    if (error instanceof ClienteNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    throw error
  }
}
