"use client";
import React, { useState } from 'react';
import { isValidInput } from './validation';

export default function InputField(props) {

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasMinus256Char, setHasMinus256Char] = useState(false);

  const [valor, setValor] = useState(props.value);

  const [validation, setValidation] = useState({
    completeName: {
      isValid: true,
      message: '',
    },
    nickname: {
      isValid: true,
      message: '',
    },
    birthday: {
      isValid: true,
      message: '',
    },
    email: {
      isValid: true,
      message: '',
    },
    password: {
      isValid: true,
      message: '',
    },
    passwordConfirmation: {
      isValid: true,
      message: '',
    },
    passwordCadastro: {
      isValid: true,
      message: '',
    },
    passwordAtual: {
      isValid: true,
      message: '',
    },
    emailEsqueciSenha: {
      isValid: true,
      message: '',
    },
  });

  const handleChange = (e) => {
    const { type, value } = e.target;
    const { isValid, message } = isValidInput(type, value) || {};

    setValor(e.target.value);

    setValidation({
      isValid,
      message,
    });

    const completeNameValidation = isValidInput('completeName', value);
    const nicknameValidation = isValidInput('nickname', value);
    const birthdayValidation = isValidInput('birthday', value);
    const emailValidation = isValidInput('email', value);
    const passwordValidation = isValidInput('password', value);
    const passwordCadastroValidation = isValidInput('passwordCadastro', value);
    const passwordAtualValidation = isValidInput('passwordAtual', value);
    const passwordConfirmationValidation = isValidInput('passwordConfirmation', value);
    const emailEsqueciSenhaValidation = isValidInput('emailEsqueciSenha', value);

    if (props.id === "passwordCadastro") {
      setHasMinLength(value.length >= 8);
      setHasUppercase(/[A-Z]/.test(value));
      setHasLowercase(/[a-z]/.test(value));
      setHasNumber(/\d/.test(value));
      setHasSpecialChar(/[@$!%*?&.]/.test(value));
      setHasMinus256Char(value.length > 256);
    }

    setValidation({
      completeName: completeNameValidation,
      nickname: nicknameValidation,
      birthday: birthdayValidation,
      email: emailValidation,
      password: passwordValidation,
      passwordCadastro: passwordCadastroValidation,
      passwordAtual: passwordAtualValidation,
      passwordConfirmation: passwordConfirmationValidation,
      emailEsqueciSenha: emailEsqueciSenhaValidation,
    });

    if (props.onChange) {
      props.onChange({
        name,
        value,
        isValid,
        message,
      });
    }
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 dark:text-zinc-100 text-sm font-bold mb-2"
        htmlFor={props.id}
      >
        {
          props.id === 'completeName' ? props.dict.nome_completo :
            props.id === 'nickname' ? props.dict.nome_usuario :
              props.id === 'birthday' ? props.dict.data_nascimento :
                props.id === 'email' ? props.dict.email :
                  props.id === 'password' ? props.dict.senha :
                    props.id === 'passwordCadastro' ? props.dict.senha :
                      props.id === 'passwordAtual' ? props.dict.senha_atual :
                        props.id === 'passwordConfirmation' ? props.dict.confirmacao_senha :
                          props.id === 'emailEsqueciSenha' ? props.dict.email : props.dict.outro
        }
      </label>
      <input
        className={`text-sm shadow appearance-none border border-neon-blue-200 w-full py-2 px-3 bg-black-100 text-gray-700 dark:text-zinc-100 leading-tight focus:outline-none focus:shadow-outline ${!validation[props.id].isValid ? 'border-red-500' : ''}`}
        id={props.id}
        type={props.type}
        name={props.id}
        value={valor}
        placeholder={props.placeholder}
        onChange={handleChange}
        onFocus={handlePasswordFocus}
        onBlur={handlePasswordBlur}
      />
      {!validation.isValid && (
        <p id={props.id + "-error"} className="text-red-500 text-xs italic">{validation[props.id].message}</p>
      )}

      {isPasswordFocused && props.id === "passwordCadastro" && (
        <ul className="text-xs mt-1">
          <li className={hasMinLength ? "text-green-500" : "text-red-500"}>
          {props.dict.minimo_8_caracteres}
          </li>
          <li className={hasUppercase ? "text-green-500" : "text-red-500"}>
          {props.dict.uma_letra_maiuscula}
          </li>
          <li className={hasLowercase ? "text-green-500" : "text-red-500"}>
          {props.dict.uma_letra_minuscula}
          </li>
          <li className={hasNumber ? "text-green-500" : "text-red-500"}>
          {props.dict.um_numero}
          </li>
          <li className={hasSpecialChar ? "text-green-500" : "text-red-500"}>
          {props.dict.um_caractere_especial}
          </li>
          {hasMinus256Char == true && (
            <li className={hasMinus256Char ? "text-red-500" : "text-green-500"}>
              {props.dict.menos_256_caracteres}
            </li>
          )}
        </ul>
      )}
      {
        isPasswordFocused &&
        props.id === "passwordConfirmation" &&
        document.getElementById("passwordCadastro").value != document.getElementById("passwordConfirmation").value && (
          <p id={props.id + "-error"} className="text-red-500 text-xs italic">{props.dict.senhas_nao_coincidem}</p>
        )
      }

    </div>
  );
}
