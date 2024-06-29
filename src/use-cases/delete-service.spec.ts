import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryServicesRepository } from '@/repositories/in-memory/in-memory-services.repository'
import { DeleteServiceUseCase } from './delete-service'
import { InMemoryClientsRepository } from '@/repositories/in-memory/in-memory-clients.repository'
import { ServiceNotFoundError } from './errors/service-not-found.error'

let servicesRepository: InMemoryServicesRepository
let clientsRepository: InMemoryClientsRepository
let sut: DeleteServiceUseCase

describe('Delete Service Use Case', async () => {
  beforeEach(async () => {
    servicesRepository = new InMemoryServicesRepository()
    clientsRepository = new InMemoryClientsRepository()
    sut = new DeleteServiceUseCase(servicesRepository)
  })

  it('should be able to delete a service', async () => {
    const client = await clientsRepository.create({
      name: 'John Doe',
      cpf: '123',
    })

    const service = await servicesRepository.create({
      vehicle: 'Car',
      licensePlate: '123',
      clientId: client.id,
    })

    const { service: deletedService } = await sut.execute({ id: service.id })

    expect(deletedService).toEqual(service)
  })

  it('should not be able to delete a non-existing service', async () => {
    await expect(sut.execute({ id: 1 })).rejects.toBeInstanceOf(
      ServiceNotFoundError,
    )
  })
})
