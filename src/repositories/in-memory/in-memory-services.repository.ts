import { Prisma, Service, ServiceStatus } from '@prisma/client'
import { ServicesRepository } from '../services-repositroy'
import { randomUUID } from 'crypto'

export class InMemoryServicesRepository implements ServicesRepository {
  public items: Service[] = []

  async create(data: Prisma.ServiceUncheckedCreateInput) {
    const service = {
      id: randomUUID(),
      vehicle: data.vehicle,
      licensePlate: data.licensePlate,
      description: data.description ?? null,
      status: data.status ?? ServiceStatus.PENDING,
      clientId: data.clientId,
    }

    this.items.push(service)

    return service
  }
}
