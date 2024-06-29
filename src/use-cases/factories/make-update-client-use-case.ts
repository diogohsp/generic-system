import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients.repository'
import { UpdateClienteUseCase } from '../update-client'

export function makeUpdateClientUseCase() {
  const clientsRepository = new PrismaClientsRepository()
  const updateClientUseCase = new UpdateClienteUseCase(clientsRepository)

  return updateClientUseCase
}
