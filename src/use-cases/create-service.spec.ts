import { InMemoryServicesRepository } from '@/repositories/in-memory/in-memory-services.repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateServiceUseCase } from './create-service'
import { InMemoryClientsRepository } from '@/repositories/in-memory/in-memory-clients.repository'
import { ClientNotFoundError } from './errors/client-not-found.error'

let servicesRepository: InMemoryServicesRepository
let clientsRepository: InMemoryClientsRepository
let sut: CreateServiceUseCase

describe('Create Service Use Case', async () => {
  beforeEach(async () => {
    servicesRepository = new InMemoryServicesRepository()
    clientsRepository = new InMemoryClientsRepository()
    sut = new CreateServiceUseCase(servicesRepository, clientsRepository)
  })

  it('should be able to create a new service', async () => {
    const client = await clientsRepository.create({
      name: 'John Doe',
      cpf: '123',
      phone: '123',
    })

    const { service } = await sut.execute({
      vehicle: 'Fusca',
      licensePlate: 'ABC-1234',
      clientId: client.id,
    })

    expect(service).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        vehicle: 'Fusca',
        licensePlate: 'ABC-1234',
        description: null,
        clientId: client.id,
        status: 'PENDING',
      }),
    )
  })

  it('should not be able to create a service if client doesnt exists', async () => {
    expect(
      sut.execute({
        vehicle: 'Fusca',
        licensePlate: 'ABC-1234',
        clientId: 1,
      }),
    ).rejects.toBeInstanceOf(ClientNotFoundError)
  })
})
