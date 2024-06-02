import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { MechanicRepository } from '../mechanics-repository'

export class PrismaMechanicsRepository implements MechanicRepository {
  async create(data: Prisma.MechanicCreateInput) {
    const mechanic = await prisma.mechanic.create({
      data: {
        email: data.email,
        password: data.password,
      },
    })

    return mechanic
  }

  async findByEmail(email: string) {
    const mechanic = await prisma.mechanic.findUnique({
      where: {
        email,
      },
    })

    return mechanic
  }
}
