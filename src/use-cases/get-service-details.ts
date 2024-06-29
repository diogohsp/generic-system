import { ServicesRepository } from '@/repositories/services-repositroy'
import { ServiceNotFoundError } from './errors/service-not-found.error'

interface GetServiceDetailsUseCaseParams {
  id: number
}

export class GetServiceDetailsUseCase {
  constructor(private servicesRepository: ServicesRepository) {}

  async execute({ id }: GetServiceDetailsUseCaseParams) {
    const service = await this.servicesRepository.findById(id)

    if (!service) {
      throw new ServiceNotFoundError()
    }

    return {
      service,
    }
  }
}
