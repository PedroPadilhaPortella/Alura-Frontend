import { validadeCPF } from './cpfValidator.js';
import { validadeBirthDate } from './dataValidator.js';
import { validadeCEP } from './cepValidator.js';

const validators = {
    nascimento: input => validadeBirthDate(input),
    cpf: input => validadeCPF(input),
    cep: input => validadeCEP(input),
}

const errorTypes = ['valueMissing', 'typeMismatch', 'patternMismatch', 'customError'];

const errorMessages = {
    nome: {
        valueMissing: 'O campo nome não pode estar vazio'
    },
    email: {
        valueMissing: 'O campo email não pode estar vazio', 
        typeMismatch: 'O email digitado não é válido'
    },
    senha: {
        valueMissing: 'O campo senha não pode estar vazio',
        patternMismatch: 'A senha deve conter entre 6 a 12 caracteres, com pelo menos uma letra maiúscula e um número, e não deve conter símbolos'
    },
    nascimento: {
        valueMissing: 'O campo data de nascimento não pode estar vazio',
        customError: 'Você precisa ser maior que 18 anos para se cadastrar'
    },
    cpf: {
        valueMissing: 'O campo CPF não pode estar vazio',
        patternMismatch: 'O campo CPF está inválido',
        customError: 'CPF Inválido'
    },
    cep: {
        valueMissing: 'O campo CEP não pode estar vazio',
        patternMismatch: 'O campo CEP está inválido',
        customError: 'Não foi possível encotrar esse Endereço'
    },
    logradouro: {
        valueMissing: 'O campo logradouro não pode estar vazio',
    },
    cidade: {
        valueMissing: 'O campo cidade não pode estar vazio',
    },
    estado: {
        valueMissing: 'O campo estado não pode estar vazio',
    },
}

/**
 * 
 * @param {EventTarget} input 
 */
export function validate(input) {
    const type = input.dataset.tipo;
    
    if(validators[type]) {
        validators[type](input);
    }
    
    if(input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = '';
    } else {
        input.parentElement.classList.add('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = showErrorMessage(type, input);
    }
}

/**
 * 
 * @param {string} inputType 
 * @param {EventTarget} input 
 * @returns 
 */
function showErrorMessage(inputType, input) {
    let message = '';
    errorTypes.forEach(errorType => {
        if(input.validity[errorType]) message = errorMessages[inputType][errorType];
    });
    return message;
}