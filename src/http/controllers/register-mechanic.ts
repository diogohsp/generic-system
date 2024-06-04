import { EmailAlreadyExistsError } from '@/use-cases/errors/email-already-exists.error'
import { makeRegisterMechanicUseCase } from '@/use-cases/factories/make-register-mechanic-use-case'
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
    const registerMechanicUseCase = makeRegisterMechanicUseCase()

    await registerMechanicUseCase.execute({
      email,
      password,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}
