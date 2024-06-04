import { PrismaMechanicsRepository } from '@/repositories/prisma/prisma-mechanics.repository'
import { RegisterMechanicUseCase } from '../register-mechanic'

export function makeRegisterMechanicUseCase() {
  const mechanicsRepository = new PrismaMechanicsRepository()
  const registerMechanicUseCase = new RegisterMechanicUseCase(
    mechanicsRepository,
  )

  return registerMechanicUseCase
}
