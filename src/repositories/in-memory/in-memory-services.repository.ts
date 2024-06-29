import { Prisma, Service, ServiceStatus } from '@prisma/client'
import { ServicesRepository } from '../services-repositroy'

export class InMemoryServicesRepository implements ServicesRepository {
  public items: Service[] = []

  async create(data: Prisma.ServiceUncheckedCreateInput) {
    const service = {
      id: this.items.length + 1,
      vehicle: data.vehicle,
      licensePlate: data.licensePlate,
      description: data.description ?? null,
      status: data.status ?? ServiceStatus.PENDING,
      clientId: data.clientId,
    }

    this.items.push(service)

    return service
  }

  async findById(id: number) {
    const service = this.items.find((service) => service.id === id)

    if (!service) {
      return null
    }

    return service
  }

  async delete(id: number) {
    const service = this.items.find((service) => service.id === id)

    if (!service) {
      return null
    }

    this.items = this.items.filter((service) => service.id !== id)

    return service
  }
}
