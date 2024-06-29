import { Prisma, Mechanic } from '@prisma/client'
import { MechanicsRepository } from '../mechanics-repository'

export class InMemoryMechaenicsRepository implements MechanicsRepository {
  public items: Mechanic[] = []

  async create(data: Prisma.MechanicCreateInput) {
    const mechanic = {
      id: this.items.length + 1,
      email: data.email,
      password: data.password,
    }

    this.items.push(mechanic)

    return mechanic
  }

  async findByEmail(email: string) {
    const mechanic = this.items.find((mechanic) => mechanic.email === email)

    if (!mechanic) {
      return null
    }

    return mechanic
  }
}
