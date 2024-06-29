import { Client, Prisma } from '@prisma/client'
import { ClientsRepository } from '../clients-repository'

export class InMemoryClientsRepository implements ClientsRepository {
  public items: Client[] = []

  async create(data: Prisma.ClientCreateInput) {
    const client = {
      id: this.items.length + 1,
      name: data.name,
      cpf: data.cpf,
      phone: data.phone,
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

  async findById(id: number) {
    const client = this.items.find((item) => item.id === id)

    if (!client) {
      return null
    }

    return client
  }

  async delete(id: number) {
    const client = this.items.find((item) => item.id === id)

    if (!client) {
      return null
    }

    this.items = this.items.filter((item) => item.id !== id)

    return client
  }

  async update(id: number, data: Prisma.ClientUpdateInput) {
    const client = this.items.find((item) => item.id === id)

    const updatedClient = {
      id: client!.id,
      name: data.name as string,
      cpf: data.cpf as string,
      phone: data.phone as string,
    }

    this.items = this.items.map((item) => {
      if (item.id === id) {
        return updatedClient
      }

      return item
    })

    return updatedClient
  }
}
