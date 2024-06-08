-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_clientId_fkey";

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
