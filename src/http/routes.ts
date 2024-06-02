import { FastifyInstance } from 'fastify'
import { registerMechanic } from './controllers/register-mechanic'

export async function appRoutes(app: FastifyInstance) {
  app.post('/mechanics', registerMechanic)
}
