import { ServicesRepository } from '@/repositories/services-repositroy'
import { ServiceNotFoundError } from './errors/service-not-found.error'

interface DeleteServiceUseCaseParams {
  id: number
}

export class DeleteServiceUseCase {
  constructor(private servicesRepository: ServicesRepository) {}

  async execute({ id }: DeleteServiceUseCaseParams) {
    const service = await this.servicesRepository.findById(id)

    if (!service) {
      throw new ServiceNotFoundError()
    }

    await this.servicesRepository.delete(id)

    return {
      service,
    }
  }
}
