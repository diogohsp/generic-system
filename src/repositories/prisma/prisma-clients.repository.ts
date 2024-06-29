import { Prisma } from '@prisma/client'
import { ClientsRepository } from '../clients-repository'
import { prisma } from '@/lib/prisma'

export class PrismaClientsRepository implements ClientsRepository {
  async create(data: Prisma.ClientCreateInput) {
    const client = await prisma.client.create({
      data: {
        name: data.name,
        cpf: data.cpf,
        phone: data.phone,
      },
    })

    return client
  }

  async findByCpf(cpf: string) {
    const client = await prisma.client.findUnique({
      where: {
        cpf,
      },
    })

    return client
  }

  async findById(id: number) {
    const client = await prisma.client.findUnique({
      where: {
        id,
      },
    })

    return client
  }

  async delete(id: number) {
    const client = await prisma.client.delete({
      where: {
        id,
      },
    })

    return client
  }

  async update(id: number, data: Prisma.ClientUpdateInput) {
    const client = await prisma.client.update({
      where: {
        id,
      },
      data,
    })

    return client
  }
}
