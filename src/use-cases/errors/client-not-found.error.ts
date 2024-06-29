export class ClientNotFoundError extends Error {
  constructor() {
    super('Cliente não encontrado')
  }
}
