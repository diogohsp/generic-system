export class ClientAlreadyExistsError extends Error {
  constructor() {
    super('Já existe um cliente com esse CPF')
  }
}
