import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients.repository'
import { CreateClientUseCase } from '../create-client'

export function makeCreateClientUseCase() {
  const clientsRepository = new PrismaClientsRepository()
  const createClientUseCase = new CreateClientUseCase(clientsRepository)

  return createClientUseCase
}
