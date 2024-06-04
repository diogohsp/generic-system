import { FastifyInstance } from 'fastify'
import { registerMechanic } from './controllers/register-mechanic'
import { authenticateMechanic } from './controllers/authenticate-mechanic'

export async function appRoutes(app: FastifyInstance) {
  app.post('/mechanics', registerMechanic)
  app.post('/mechanics/sessions', authenticateMechanic)
}
