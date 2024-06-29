import { describe, it, beforeEach, expect } from 'vitest'
import { DeleteClientUseCase } from './delete-client'
import { InMemoryClientsRepository } from '@/repositories/in-memory/in-memory-clients.repository'
import { ClienteNotFoundError } from './errors/client-not-found.error'

let clientsRepository: InMemoryClientsRepository
let sut: DeleteClientUseCase

describe('Delete Client Use Case', async () => {
  beforeEach(async () => {
    clientsRepository = new InMemoryClientsRepository()
    sut = new DeleteClientUseCase(clientsRepository)
  })

  it('should be able to delete a client', async () => {
    const client = await clientsRepository.create({
      name: 'John Doe',
      cpf: '123',
      phone: '123',
    })

    const { client: deletedClient } = await sut.execute({
      id: client.id,
    })

    expect(deletedClient).toEqual(client)
  })

  it('should not be able to delete a non-existing client', async () => {
    await expect(sut.execute({ id: 1 })).rejects.toBeInstanceOf(
      ClienteNotFoundError,
    )
  })
})
