import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateMechanicUseCase } from '@/use-cases/factories/make-authenticate-mechanic-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticateMechanic(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = bodySchema.parse(request.body)

  try {
    const authenticateMechanicUseCase = makeAuthenticateMechanicUseCase()

    const { mechanic } = await authenticateMechanicUseCase.execute({
      email,
      password,
    })

    return reply.send({ mechanic })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
