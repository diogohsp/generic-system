import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryClientsRepository } from '@/repositories/in-memory/in-memory-clients.repository'
import { CreateClientUseCase } from './create-client'
import { ClientAlreadyExistsError } from './errors/client-already-exists.error'

let clientsRepository: InMemoryClientsRepository
let sut: CreateClientUseCase

describe('Create Client Use Case', async () => {
  beforeEach(async () => {
    clientsRepository = new InMemoryClientsRepository()
    sut = new CreateClientUseCase(clientsRepository)
  })

  it('should create a client', async () => {
    const { client } = await sut.execute({
      name: 'John Doe',
      cpf: '12345678900',
      phone: '12345678900',
    })

    expect(client.id).toEqual(expect.any(BigInt))
  })

  it('should not create a client with an existing CPF', async () => {
    await clientsRepository.create({
      name: 'John Doe',
      cpf: '12345678900',
      phone: '12345678900',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        cpf: '12345678900',
        phone: '12345678900',
      }),
    ).rejects.toBeInstanceOf(ClientAlreadyExistsError)
  })
})
