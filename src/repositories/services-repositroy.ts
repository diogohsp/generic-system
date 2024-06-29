import { Prisma, Service } from '@prisma/client'

export interface ServicesRepository {
  create: (data: Prisma.ServiceUncheckedCreateInput) => Promise<Service>
  findById: (id: number) => Promise<Service | null>
  delete: (id: number) => Promise<Service | null>
}
