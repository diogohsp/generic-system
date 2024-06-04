import { MechanicsRepository } from '@/repositories/mechanics-repository'
import { Mechanic } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateMechanicUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateMechanicUseCaseResponse {
  mechanic: Mechanic
}

export class AuthenticateMechanicUseCase {
  constructor(private mechanicRepository: MechanicsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateMechanicUseCaseRequest): Promise<AuthenticateMechanicUseCaseResponse> {
    const mechanic = await this.mechanicRepository.findByEmail(email)

    if (!mechanic) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, mechanic.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      mechanic,
    }
  }
}
