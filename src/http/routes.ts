import { FastifyInstance } from 'fastify'
import { registerMechanic } from './controllers/register-mechanic'
import { authenticateMechanic } from './controllers/authenticate-mechanic'
import { createClient } from './controllers/create-client'
import { deleteClient } from './controllers/delete-client'
import { createService } from './controllers/create-service'

export async function appRoutes(app: FastifyInstance) {
  app.post('/mechanics', registerMechanic)
  app.post('/mechanics/sessions', authenticateMechanic)
  app.post('/clients', createClient)
  app.post('/services', createService)
  app.delete('/clients/:id', deleteClient)
}
