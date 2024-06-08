import { ClientsRepository } from '@/repositories/clients-repository'
import { ClienteNotFoundError } from './errors/client-not-found.error'

interface DeleteClientUseCaseParams {
  id: bigint
}

export class DeleteClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({ id }: DeleteClientUseCaseParams) {
    const client = await this.clientsRepository.findById(id)

    if (!client) {
      throw new ClienteNotFoundError()
    }

    await this.clientsRepository.delete(id)

    return {
      client,
    }
  }
}
