import { Prisma } from '@prisma/client'
import { ServicesRepository } from '../services-repositroy'
import { prisma } from '@/lib/prisma'

export class PrismaServicesRepository implements ServicesRepository {
  async create(data: Prisma.ServiceUncheckedCreateInput) {
    const service = await prisma.service.create({
      data: {
        vehicle: data.vehicle,
        licensePlate: data.licensePlate,
        description: data.description,
        status: data.status,
        clientId: data.clientId,
      },
    })

    return service
  }
}
