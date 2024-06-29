import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryServicesRepository } from '@/repositories/in-memory/in-memory-services.repository'
import { GetServiceDetailsUseCase } from './get-service-details'
import { InMemoryClientsRepository } from '@/repositories/in-memory/in-memory-clients.repository'
import { ServiceNotFoundError } from './errors/service-not-found.error'

let clientsRepository: InMemoryClientsRepository
let servicesRepository: InMemoryServicesRepository
let sut: GetServiceDetailsUseCase

describe('Get Service Details Use Case', async () => {
  beforeEach(async () => {
    clientsRepository = new InMemoryClientsRepository()
    servicesRepository = new InMemoryServicesRepository()
    sut = new GetServiceDetailsUseCase(servicesRepository)
  })

  it('should be able to get service details', async () => {
    const client = await clientsRepository.create({
      name: 'John Doe',
      cpf: '123',
      phone: '123',
    })

    const service = await servicesRepository.create({
      vehicle: 'Monza',
      licensePlate: 'ABC-1234',
      clientId: client.id,
    })

    const { service: serviceDetails } = await sut.execute({
      id: service.id,
    })

    expect(serviceDetails.id).toEqual(service.id)
  })

  it('should not be able to get service details if service does not exist', async () => {
    await expect(sut.execute({ id: 1 })).rejects.toBeInstanceOf(
      ServiceNotFoundError,
    )
  })
})
