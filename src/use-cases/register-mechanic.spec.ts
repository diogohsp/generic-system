import { describe, it, expect } from 'vitest'
import { RegisterMechanicUseCase } from './register-mechanic'
import { compare } from 'bcryptjs'
import { InMemoryMechaenicsRepository } from '@/repositories/in-memory/in-memory-mechanics.repository'
import { EmailAlreadyExistsError } from './errors/email-already-exists.error'

describe('Register Mechanic Use Case', async () => {
  it('should be able to register a new mechanic', async () => {
    const mechanicsRepository = new InMemoryMechaenicsRepository()
    const registerMehanicUseCase = new RegisterMechanicUseCase(
      mechanicsRepository,
    )

    const { mechanic } = await registerMehanicUseCase.execute({
      email: 'john@doe.com',
      password: 'Abcd123@',
    })

    expect(mechanic.id).toEqual(expect.any(String))
  })

  it('should hash mechanic password upon registration', async () => {
    const mechanicsRepository = new InMemoryMechaenicsRepository()
    const registerMehanicUseCase = new RegisterMechanicUseCase(
      mechanicsRepository,
    )

    const { mechanic } = await registerMehanicUseCase.execute({
      email: 'john@joe.com',
      password: 'Abcd123@',
    })

    const isPasswordCorrectlyHashed = await compare(
      'Abcd123@',
      mechanic.password,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register a mechanic with an existing email', async () => {
    const mechanicsRepository = new InMemoryMechaenicsRepository()
    const registerMehanicUseCase = new RegisterMechanicUseCase(
      mechanicsRepository,
    )

    await registerMehanicUseCase.execute({
      email: 'john@doe.com',
      password: 'Abcd123@',
    })

    expect(async () => {
      await registerMehanicUseCase.execute({
        email: 'john@doe.com',
        password: 'Abcd123@',
      })
    }).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })
})
