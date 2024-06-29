import { PrismaServicesRepository } from '@/repositories/prisma/prisma-services.repository'
import { GetServiceDetailsUseCase } from '../get-service-details'

export function makeGetServiceDetailsUseCase() {
  const servicesRepository = new PrismaServicesRepository()
  const getServiceDetailsUseCase = new GetServiceDetailsUseCase(
    servicesRepository,
  )

  return getServiceDetailsUseCase
}
