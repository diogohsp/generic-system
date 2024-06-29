import { ClientsRepository } from '@/repositories/clients-repository'
import { ClienteNotFoundError } from './errors/client-not-found.error'

interface GetClientProfileUseCaseParams {
  id: number
}

export class GetClientProfileUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({ id }: GetClientProfileUseCaseParams) {
    const client = await this.clientsRepository.findById(id)

    if (!client) {
      throw new ClienteNotFoundError()
    }

    return {
      client,
    }
  }
}
