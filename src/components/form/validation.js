export function isValidInput(inputID, value) {

  if (inputID === 'email') {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (value.length === 0) {
      return {
        isValid: false,
        message: 'Campo obrigatório.',
      };
    } else if (!emailPattern.test(value)) {
      return {
        isValid: false,
        message: 'Email inválido. Certifique-se de usar um @ e um domínio válido.',
      };
    } else {
      return {
        isValid: true,
        message: '',
      };
    }
  } else if (inputID === 'password') {
    if (value.length === 0) {
      return {
        isValid: false,
        message: 'Campo obrigatório.',
      };
    } else if (value.length < 6) {
      return {
        isValid: false,
        message: 'A senha deve conter pelo menos 6 caracteres.',
      };
    } else {
      return {
        isValid: true,
        message: '',

      };
    }
  }

}
