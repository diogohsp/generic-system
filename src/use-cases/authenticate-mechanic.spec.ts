import { InMemoryMechaenicsRepository } from '@/repositories/in-memory/in-memory-mechanics.repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { AuthenticateMechanicUseCase } from './authenticate-mechanic'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let mechanicsRepository: InMemoryMechaenicsRepository
let sut: AuthenticateMechanicUseCase

describe('Authenticate Mechanic Use Case', async () => {
  beforeEach(async () => {
    mechanicsRepository = new InMemoryMechaenicsRepository()
    sut = new AuthenticateMechanicUseCase(mechanicsRepository)
  })

  it('should be able to authenticate a mechanic', async () => {
    await mechanicsRepository.create({
      email: 'john@doe.com',
      password: await hash('Abcd123@', 6),
    })

    const { mechanic } = await sut.execute({
      email: 'john@doe.com',
      password: 'Abcd123@',
    })

    expect(mechanic.id).toEqual(expect.any(Number))
  })

  it('should not be able to authenticate a mechanic with doenst exists', async () => {
    await expect(() =>
      sut.execute({
        email: 'john@doe.com',
        password: 'Abcd123@',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate a mechanic with wrong password', async () => {
    await mechanicsRepository.create({
      email: 'john@doe.com',
      password: await hash('Abcd123@', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'john@doe.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
