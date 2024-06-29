import { ClientsRepository } from '@/repositories/clients-repository'
import { Client } from '@prisma/client'
import { ClientAlreadyExistsError } from './errors/client-already-exists.error'

interface CreateClientUseCaseRequest {
  name: string
  cpf: string
  phone: string
}

interface CreateClientUseCaseResponse {
  client: Client
}

export class CreateClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    name,
    cpf,
    phone,
  }: CreateClientUseCaseRequest): Promise<CreateClientUseCaseResponse> {
    const clientWithSameCpf = await this.clientsRepository.findByCpf(cpf)

    if (clientWithSameCpf) {
      throw new ClientAlreadyExistsError()
    }

    const client = await this.clientsRepository.create({
      name,
      cpf,
      phone,
    })

    return {
      client,
    }
  }
}
