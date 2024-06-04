import { PrismaMechanicsRepository } from '@/repositories/prisma/prisma-mechanics.repository'
import { AuthenticateMechanicUseCase } from '@/use-cases/authenticate-mechanic'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
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
    const mechanicsRepository = new PrismaMechanicsRepository()
    const authenticateMechanicUseCase = new AuthenticateMechanicUseCase(
      mechanicsRepository,
    )

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
