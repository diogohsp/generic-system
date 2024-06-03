import { Mechanic, Prisma } from '@prisma/client'

export interface MechanicsRepository {
  create: (data: Prisma.MechanicCreateInput) => Promise<Mechanic>
  findByEmail: (email: string) => Promise<Mechanic | null>
}
