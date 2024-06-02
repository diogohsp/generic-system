import { MechanicRepository } from '@/repositories/mechanics-repository'
import { hash } from 'bcryptjs'
import { EmailAlreadyExistsError } from './errors/email-already-exists.error'

interface RegisterMechanicUseCaseRequest {
  email: string
  password: string
}

export class RegisterMechanicUseCase {
  constructor(private mechanicRepository: MechanicRepository) {}

  async execute({ email, password }: RegisterMechanicUseCaseRequest) {
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
