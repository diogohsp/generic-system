import { ClientsRepository } from '@/repositories/clients-repository'
import { ServicesRepository } from '@/repositories/services-repositroy'
import { ClientNotFoundError } from './errors/client-not-found.error'

interface CreateServiceUseCaseRequest {
  vehicle: string
  licensePlate: string
  description?: string
  clientId: number
}

export class CreateServiceUseCase {
  constructor(
    private servicesRepository: ServicesRepository,
    private clientsRepository: ClientsRepository,
  ) {}

  async execute({
    vehicle,
    licensePlate,
    description,
    clientId,
  }: CreateServiceUseCaseRequest) {
    const client = await this.clientsRepository.findById(clientId)

    if (!client) {
      throw new ClientNotFoundError()
    }

    const service = await this.servicesRepository.create({
      vehicle,
      licensePlate,
      description,
      clientId,
    })

    return { service }
  }
}
