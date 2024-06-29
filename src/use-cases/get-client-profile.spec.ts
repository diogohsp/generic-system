import { InMemoryClientsRepository } from '@/repositories/in-memory/in-memory-clients.repository'
import { GetClientProfileUseCase } from './get-client-profile'
import { beforeEach, describe, expect, it } from 'vitest'
import { ClienteNotFoundError } from './errors/client-not-found.error'

let clientsRepository: InMemoryClientsRepository
let sut: GetClientProfileUseCase

describe('Get Cliente Profile Use Case', async () => {
  beforeEach(async () => {
    clientsRepository = new InMemoryClientsRepository()
    sut = new GetClientProfileUseCase(clientsRepository)
  })

  it('should be able to get a client profile', async () => {
    const client = await clientsRepository.create({
      name: 'John Doe',
      cpf: '123',
      phone: '123',
    })

    const { client: clientFinded } = await sut.execute({ id: client.id })

    expect(clientFinded.id).toEqual(client.id)
  })

  it('should not be able to get a non-existing client profile', async () => {
    await expect(sut.execute({ id: 1 })).rejects.toBeInstanceOf(
      ClienteNotFoundError,
    )
  })
})
