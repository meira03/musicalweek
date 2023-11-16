import { getDictionary } from "@/utils/dictionaries";

export async function isValidInput(inputID, value, { params: { lang } }) {
  let dict = await getDictionary(lang);
  dict = dict.components_form_validation;

  if (inputID === 'completeName') {
    if (value.length === 0) {
      return {
        isValid: false,
        message: dict.campo_obrigatorio,
      };
    } else if (value.length > 64) {
      return {
        isValid: false,
        message: dict.nome_menos_64,
      };
    }
    else if (!/^\b\w{2,}\s+\w{2,}\b/.test(value)) {
      return {
        isValid: false,
        message: dict.nome_invalido,
      };
    }
    else {
      return {
        isValid: true,
        message: '',
      };
    }
  }

  if (inputID === 'nickname') {
    if (value.length === 0) {
      return {
        isValid: false,
        message: dict.campo_obrigatorio,
      };
    } else if (value.length < 3 || value.length > 16) {
      return {
        isValid: false,
        message: dict.usuario_entre_3_16,
      };
    } else {
      return {
        isValid: true,
        message: '',
      };
    }
  }

  if (inputID === 'birthday') {
    const today = new Date();
    const userBirthday = new Date(value);
    const userAge = today.getFullYear() - userBirthday.getFullYear();
    if (value.length === 0) {
      return {
        isValid: false,
        message: dict.campo_obrigatorio,
      };
    } else if (userAge < 18 && userAge >= 0) {
      return {
        isValid: false,
        message: dict.acesso_menores_nao_permitido,
      };
    } else if (userAge > 130 || userAge < 0) {
      return {
        isValid: false,
        message: dict.data_nascimento_invalida,
      };
    }
    else {
      return {
        isValid: true,
        message: '',
      };
    }
  }

  if (inputID === 'email') {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (value.length === 0) {
      return {
        isValid: false,
        message: dict.campo_obrigatorio,
      };
    } else if (!emailPattern.test(value)) {
      return {
        isValid: false,
        message: dict.email_invalido,
      };
    } else if (value.length > 256) {
      return {
        isValid: false,
        message: dict.email_menos_256_caracteres,
      };
    }
    else {
      return {
        isValid: true,
        message: '',
      };
    }
  }

  if (inputID === 'passwordCadastro') {
    if (value.length === 0) {
      return {
        isValid: false,
        message: dict.campo_obrigatorio,
      };
    }
    if (value.length < 8 ||
      !/[a-z]/.test(value) ||
      !/[A-Z]/.test(value) ||
      !/[0-9]/.test(value) ||
      !/[!@#$%^&.*]/.test(value)) {
      return {
        isValid: false,
        message: dict.senha_fraca
      };
    } else {
      return {
        isValid: true,
        message: ''
      };
    }
  }

  if (inputID === 'passwordAtual') {
    if (value.length === 0) {
      return {
        isValid: false,
        message: dict.campo_obrigatorio,
      };
    } else if (value.length < 8 ||
      !/[a-z]/.test(value) ||
      !/[A-Z]/.test(value) ||
      !/[0-9]/.test(value) ||
      !/[!@#$%^&.*]/.test(value)) {
      return {
        isValid: false,
        message: dict.senha_fraca
      };
    } else {
      return {
        isValid: true,
        message: ''
      };
    }
  }

  if (inputID === 'password') {
    if (value.length === 0) {
      return {
        isValid: false,
        message: dict.campo_obrigatorio,
      };
    }
    else if (value.length > 256) {
      return {
        isValid: false,
        message: dict.menos_256_caracteres,
      };
    }
    else {
      return {
        isValid: true,
        message: ''
      };
    }
  }

  if (inputID === 'passwordConfirmation') {
    if (value.length === 0) {
      return {
        isValid: false,
        message: dict.campo_obrigatorio,
      };
    }
    else {
      return {
        isValid: true,
        message: ''
      };
    }
  }

  if (inputID === 'emailEsqueciSenha') {
    if (value.length === 0) {
      return {
        isValid: false,
        message: dict.campo_obrigatorio,
      };
    }
    else {
      return {
        isValid: true,
        message: ''
      };
    }
  }


}