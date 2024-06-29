import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterMechanicUseCase } from './register-mechanic'
import { compare } from 'bcryptjs'
import { InMemoryMechaenicsRepository } from '@/repositories/in-memory/in-memory-mechanics.repository'
import { EmailAlreadyExistsError } from './errors/email-already-exists.error'

let mechanicsRepository: InMemoryMechaenicsRepository
let sut: RegisterMechanicUseCase

describe('Register Mechanic Use Case', async () => {
  beforeEach(async () => {
    mechanicsRepository = new InMemoryMechaenicsRepository()
    sut = new RegisterMechanicUseCase(mechanicsRepository)
  })

  it('should be able to register a new mechanic', async () => {
    const { mechanic } = await sut.execute({
      email: 'john@doe.com',
      password: 'Abcd123@',
    })

    expect(mechanic.id).toEqual(expect.any(Number))
  })

  it('should hash mechanic password upon registration', async () => {
    const { mechanic } = await sut.execute({
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
    await sut.execute({
      email: 'john@doe.com',
      password: 'Abcd123@',
    })

    await expect(() =>
      sut.execute({
        email: 'john@doe.com',
        password: 'Abcd123@',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })
})
