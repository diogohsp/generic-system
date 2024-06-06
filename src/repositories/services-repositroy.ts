import { Prisma, Service } from '@prisma/client'

export interface ServicesRepository {
  create: (data: Prisma.ServiceUncheckedCreateInput) => Promise<Service>
}
