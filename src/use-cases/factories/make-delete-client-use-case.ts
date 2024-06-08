import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients.repository'
import { DeleteClientUseCase } from '../delete-client'

export function makeDeleteClientUseCase() {
  const clientsRepository = new PrismaClientsRepository()
  const deleteClientUseCase = new DeleteClientUseCase(clientsRepository)

  return deleteClientUseCase
}
