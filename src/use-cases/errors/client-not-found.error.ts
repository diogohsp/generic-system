export class ClienteNotFoundError extends Error {
  constructor() {
    super('Cliente não encontrado')
  }
}
