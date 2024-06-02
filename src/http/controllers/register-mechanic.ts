import { PrismaMechanicsRepository } from '@/repositories/prisma/prisma-mechanics.repository'
import { RegisterMechanicUseCase } from '@/use-cases/register-mechanic'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerMechanic(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
      .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
      .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
      .regex(
        /[^!@#$%^&*()_+]/,
        'A senha deve conter pelo menos um caractere especial',
      ),
  })

  const { email, password } = bodySchema.parse(request.body)

  try {
    const mechanicsRepository = new PrismaMechanicsRepository()
    const registerMechanicUseCase = new RegisterMechanicUseCase(
      mechanicsRepository,
    )

    await registerMechanicUseCase.execute({
      email,
      password,
    })

    return reply.status(201).send()
  } catch (error) {
    return reply.status(409).send()
  }
}
