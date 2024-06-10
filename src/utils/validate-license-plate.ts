export function validateLicensePlate(value: string) {
  if (!value) {
    return false
  }

  if (value.length > 8) {
    return false
  }

  value = value.replace('-', '').trim()

  /*
   *  Verifica se o caractere da posição 4 é uma letra, se sim, aplica a validação para o formato de placa do Mercosul,
   *  senão, aplica a validação do formato de placa padrão.
   */
  if (/^[a-zA-Z]$/.test(value.charAt(4))) {
    /*
     *  Verifica se a placa está no formato: três letras, um número, uma letra e dois números.
     */
    const padraoMercosul = /[a-zA-Z]{3}[0-9]{1}[a-zA-Z]{1}[0-9]{2}/
    return padraoMercosul.test(value)
  } else {
    // Verifica se os 3 primeiros caracteres são letras e se os 4 últimos são números.
    const padraoNormal = /[a-zA-Z]{3}[0-9]{4}/
    return padraoNormal.test(value)
  }
}
