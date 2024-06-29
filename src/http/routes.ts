import { FastifyInstance } from 'fastify'
import { registerMechanic } from './controllers/register-mechanic'
import { authenticateMechanic } from './controllers/authenticate-mechanic'
import { createClient } from './controllers/create-client'
import { deleteClient } from './controllers/delete-client'
import { createService } from './controllers/create-service'
import { deleteService } from './controllers/delete-service'
import { getClientProfile } from './controllers/get-client-profile'
import { getServiceDetails } from './controllers/get-service-details'

export async function appRoutes(app: FastifyInstance) {
  app.get('/clients/:id', getClientProfile)
  app.get('/services/:id', getServiceDetails)
  app.post('/mechanics', registerMechanic)
  app.post('/mechanics/sessions', authenticateMechanic)
  app.post('/clients', createClient)
  app.post('/services', createService)
  app.delete('/clients/:id', deleteClient)
  app.delete('/services/:id', deleteService)
}
