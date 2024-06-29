import { ClientsRepository } from '@/repositories/clients-repository'
import { Client } from '@prisma/client'
import { ClientAlreadyExistsError } from './errors/client-already-exists.error'
import { ClientNotFoundError } from './errors/client-not-found.error'

interface UpdateClienteUseCaseRequest {
  id: number
  name: string
  cpf: string
  phone: string
}

interface UpdateClienteUseCaseResponse {
  client: Client
}

export class UpdateClienteUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    id,
    name,
    cpf,
    phone,
  }: UpdateClienteUseCaseRequest): Promise<UpdateClienteUseCaseResponse> {
    const clientExists = await this.clientsRepository.findById(id)

    if (!clientExists) {
      throw new ClientNotFoundError()
    }

    const clientWithSameCpf = await this.clientsRepository.findByCpf(cpf)

    if (clientWithSameCpf) {
      if (clientWithSameCpf.id !== id) {
        throw new ClientAlreadyExistsError()
      }
    }

    const client = await this.clientsRepository.update(id, {
      name,
      cpf,
      phone,
    })

    return {
      client,
    }
  }
}
