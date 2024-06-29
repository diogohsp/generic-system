import { ClienteNotFoundError } from './errors/client-not-found.error'
import { ServicesRepository } from '@/repositories/services-repositroy'

interface GetServiceDetailsUseCaseParams {
  id: number
}

export class GetServiceDetailsUseCase {
  constructor(private servicesRepository: ServicesRepository) {}

  async execute({ id }: GetServiceDetailsUseCaseParams) {
    const client = await this.servicesRepository.findById(id)

    if (!client) {
      throw new ClienteNotFoundError()
    }

    return {
      client,
    }
  }
}
