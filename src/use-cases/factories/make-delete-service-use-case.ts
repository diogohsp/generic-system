import { PrismaServicesRepository } from '@/repositories/prisma/prisma-services.repository'
import { DeleteServiceUseCase } from '../delete-service'

export function makeDeleteServiceUseCase() {
  const servicesRepository = new PrismaServicesRepository()
  const deleteServiceUseCase = new DeleteServiceUseCase(servicesRepository)

  return deleteServiceUseCase
}
