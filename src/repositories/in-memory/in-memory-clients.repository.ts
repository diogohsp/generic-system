import { Client, Prisma } from '@prisma/client'
import { ClientsRepository } from '../clients-repository'
import { randomUUID } from 'crypto'

export class InMemoryClientsRepository implements ClientsRepository {
  public items: Client[] = []

  async create(data: Prisma.ClientCreateInput) {
    const client = {
      id: randomUUID(),
      name: data.name,
      cpf: data.cpf,
      phone: data.phone ?? null,
    }

    this.items.push(client)

    return client
  }

  async findByCpf(cpf: string) {
    const client = this.items.find((item) => item.cpf === cpf)

    if (!client) {
      return null
    }

    return client
  }

  async findById(id: string) {
    const client = this.items.find((item) => item.id === id)

    if (!client) {
      return null
    }

    return client
  }
}
