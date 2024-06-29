import { ClientsRepository } from '@/repositories/clients-repository'
import { ClientNotFoundError } from './errors/client-not-found.error'

interface DeleteClientUseCaseParams {
  id: number
}

export class DeleteClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({ id }: DeleteClientUseCaseParams) {
    const client = await this.clientsRepository.findById(id)

    if (!client) {
      throw new ClientNotFoundError()
    }

    await this.clientsRepository.delete(id)

    return {
      client,
    }
  }
}
