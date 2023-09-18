"use client";
import React, { useState } from 'react';
import { isValidInput } from './validation';

export default function InputField(props) {

  const [validation, setValidation] = useState({
    email: {
      isValid: true,
      message: '',
    },
    password: {
      isValid: true,
      message: '',
    },
  });

  const handleChange = (e) => {
    const { type, value } = e.target;
    const { isValid, message } = isValidInput(type, value) || {};

    setValidation({
      isValid,
      message,
    });

    // Validação do email ao submeter o formulário
    const emailValidation = isValidInput('email', value);
    const senhaValidation = isValidInput('password', value);

    setValidation({
      email: emailValidation,
      password: senhaValidation,
    });

    // Pass the updated value to the parent component's onChange handler
    if (props.onChange) {
      props.onChange({
        name,
        value,
        isValid,
        message,
      });
    }
  };

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 dark:text-zinc-100 text-sm font-bold mb-2"
        htmlFor={props.id}
      >
        {props.id === 'email' ? 'Email' : props.id === 'password' ? 'Senha' : 'Outro'}
      </label>
      <input
        className={`text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-zinc-100 leading-tight focus:outline-none focus:shadow-outline ${!validation[props.id].isValid ? 'border-red-500' : ''}`}
        id={props.id}
        type={props.type}
        name={props.id}
        placeholder={props.placeholder}
        onChange={handleChange}// Add this line to handle input changes
      />
      {!validation.isValid && (
        <p id={props.id + "-error"} className="text-red-500 text-xs italic">{validation[props.id].message}</p>
      )}
    </div>
  );
}
