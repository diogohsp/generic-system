import { Prisma, Service } from '@prisma/client'

export interface ServicesRepository {
  create: (data: Prisma.ServiceUncheckedCreateInput) => Promise<Service>
  findById: (id: bigint) => Promise<Service | null>
  delete: (id: bigint) => Promise<Service | null>
}
