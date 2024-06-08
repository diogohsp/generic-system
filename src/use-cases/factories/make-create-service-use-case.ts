import { PrismaServicesRepository } from '@/repositories/prisma/prisma-services.repository'
import { CreateServiceUseCase } from '../create-service'
import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients.repository'

export function makeCreateServiceUseCase() {
  const servicesRepository = new PrismaServicesRepository()
  const clientsRepository = new PrismaClientsRepository()
  const createServiceUseCase = new CreateServiceUseCase(
    servicesRepository,
    clientsRepository,
  )

  return createServiceUseCase
}
