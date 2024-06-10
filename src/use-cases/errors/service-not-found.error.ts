export class ServiceNotFoundError extends Error {
  constructor() {
    super('Serviço não encontrado')
  }
}
