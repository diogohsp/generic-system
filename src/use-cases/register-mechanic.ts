import { hash } from 'bcryptjs'
import { EmailAlreadyExistsError } from './errors/email-already-exists.error'
import { Mechanic } from '@prisma/client'
import { MechanicsRepository } from '@/repositories/mechanics-repository'

interface RegisterMechanicUseCaseRequest {
  email: string
  password: string
}

interface RegisterMechanicUseCaseResponse {
  mechanic: Mechanic
}

export class RegisterMechanicUseCase {
  constructor(private mechanicRepository: MechanicsRepository) {}

  async execute({
    email,
    password,
  }: RegisterMechanicUseCaseRequest): Promise<RegisterMechanicUseCaseResponse> {
    const mechanicWithSameEmail =
      await this.mechanicRepository.findByEmail(email)

    if (mechanicWithSameEmail) {
      throw new EmailAlreadyExistsError()
    }

    const hashedPassword = await hash(password, 6)

    const mechanic = await this.mechanicRepository.create({
      email,
      password: hashedPassword,
    })

    return {
      mechanic,
    }
  }
}
