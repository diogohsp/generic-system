import { Mechanic, Prisma } from '@prisma/client'

export interface MechanicRepository {
  create: (data: Prisma.MechanicCreateInput) => Promise<Mechanic>
  findByEmail: (email: string) => Promise<Mechanic | null>
}
