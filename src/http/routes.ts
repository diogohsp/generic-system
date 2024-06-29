import { FastifyInstance } from 'fastify'
import { registerMechanic } from './controllers/register-mechanic'
import { authenticateMechanic } from './controllers/authenticate-mechanic'
import { createClient } from './controllers/create-client'
import { deleteClient } from './controllers/delete-client'
import { createService } from './controllers/create-service'
import { deleteService } from './controllers/delete-service'
import { getClientProfile } from './controllers/get-client-profile'
import { getServiceDetails } from './controllers/get-service-details'
import { updateClient } from './controllers/update-client'

export async function appRoutes(app: FastifyInstance) {
  app.get('/clients/:id', getClientProfile)
  app.put('/clients/:id', updateClient)
  app.post('/clients', createClient)
  app.delete('/clients/:id', deleteClient)

  app.get('/services/:id', getServiceDetails)
  app.post('/services', createService)
  app.delete('/services/:id', deleteService)

  app.post('/mechanics', registerMechanic)
  app.post('/mechanics/sessions', authenticateMechanic)
}
