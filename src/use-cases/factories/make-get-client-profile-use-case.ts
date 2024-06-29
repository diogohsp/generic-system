import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients.repository'
import { GetClientProfileUseCase } from '../get-client-profile'

export function makeGetClientProfileUseCase() {
  const clientsRepository = new PrismaClientsRepository()
  const getClientProfileUseCase = new GetClientProfileUseCase(clientsRepository)

  return getClientProfileUseCase
}
