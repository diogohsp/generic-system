import { PrismaMechanicsRepository } from '@/repositories/prisma/prisma-mechanics.repository'
import { AuthenticateMechanicUseCase } from '../authenticate-mechanic'

export function makeAuthenticateMechanicUseCase() {
  const mechanicsRepository = new PrismaMechanicsRepository()
  const authenticateMechanicUseCase = new AuthenticateMechanicUseCase(
    mechanicsRepository,
  )

  return authenticateMechanicUseCase
}
