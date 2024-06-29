import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryClientsRepository } from '@/repositories/in-memory/in-memory-clients.repository'
import { UpdateClienteUseCase } from './update-client'
import { ClientNotFoundError } from './errors/client-not-found.error'
import { ClientAlreadyExistsError } from './errors/client-already-exists.error'

let clientsRepository: InMemoryClientsRepository
let sut: UpdateClienteUseCase

describe('Update Client Use Case', async () => {
  beforeEach(async () => {
    clientsRepository = new InMemoryClientsRepository()
    sut = new UpdateClienteUseCase(clientsRepository)
  })

  it('should be able to update a client', async () => {
    const client = await clientsRepository.create({
      name: 'John Doe',
      cpf: '123',
      phone: '123',
    })

    const updatedClient = await sut.execute({
      id: client.id,
      name: 'Jane Doe',
      cpf: '456',
      phone: '456',
    })

    expect(updatedClient.client.id).toEqual(client.id)
  })

  it('should not be able to update a client if client does not exist', async () => {
    await expect(
      sut.execute({ id: 1, name: 'Jane Doe', cpf: '456', phone: '456' }),
    ).rejects.toBeInstanceOf(ClientNotFoundError)
  })

  it('should not be able to update a client if cpf already exists', async () => {
    await clientsRepository.create({
      name: 'John Doe',
      cpf: '123',
      phone: '123',
    })

    const client = await clientsRepository.create({
      name: 'Jane Doe',
      cpf: '456',
      phone: '456',
    })

    await expect(
      sut.execute({
        id: client.id,
        name: 'Jane Doe',
        cpf: '123',
        phone: '456',
      }),
    ).rejects.toBeInstanceOf(ClientAlreadyExistsError)
  })
})
