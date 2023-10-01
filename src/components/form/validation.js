export function isValidInput(inputID, value) {

  if (inputID === 'completeName'){
    if (value.length === 0) {
      return {
        isValid: false,
        message: 'Campo Obrigatório.',
      };
    }else if(!/^\b\w{2,}\s+\w{2,}\b/.test(value)){
      return {
        isValid: false,
        message: 'Nome inválido.',
      };
    }
    else{
      return {
        isValid: true,
        message: '',
      };
    }    
  }

  if (inputID === 'nickname'){
    if (value.length < 3  || value.length > 16) {
        return {
          isValid: false,
          message: 'O nome do usuário precisa possir ao menos 3 e no máximo 16 caracteres.',
        };
      }else{
        return {
          isValid: true,
          message: '',
        };
      }
  }

  if (inputID === 'birthday'){
    const today = new Date();
    const userBirthday = new Date(value);
    const userAge = today.getFullYear() - userBirthday.getFullYear();
    
    if(userAge < 18){
      return {
        isValid: false,
        message: "Acesso a menores de idade não permitido.",
      };
    }else if(userAge > 130){
            return {
              isValid: false,
              message: "Data de nascimento inválida.",
            };     
          }else{
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
        message: 'Campo Obrigatório.',
      };
    }else if (!emailPattern.test(value)) {
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
  } 
  
  if (inputID === 'passwordCadastro') {    
    if(value.length < 8 ||
    !/[a-z]/.test(value) ||
    !/[A-Z]/.test(value) ||
    !/[0-9]/.test(value) ||
    !/[!@#$%^&*]/.test(value)){
      return {
        isValid: false,
        message: 'Senha fraca.'      
      };
    }else{
      return {
        isValid: true,
        message: ''      
      };
    }
  }

  if (inputID === 'password') {    
    if(value.length === 0){
      return {
        isValid: false,
        message: 'Preencha o campo para prosseguir.'      
      };
    }else{
      return {
        isValid: true,
        message: ''      
      };
    }
  }

  if (inputID === 'passwordConfirmation') {    
    return {
      isValid: true,
      message: ''      
    };
  }

  if (inputID === 'emailEsqueciSenha') {    
    return {
      isValid: true,
      message: ''      
    };
  }
  

}
