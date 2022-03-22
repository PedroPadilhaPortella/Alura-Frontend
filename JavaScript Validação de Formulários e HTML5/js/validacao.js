const validators = {
    nascimento: input => validadeBirthDate(input),
    cpf: input => validadeCPF(input),
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
        patternMismatch: 'CPF Inválido',
        customError: 'CPF Inválido'
    },
    cep: {
        valueMissing: 'O campo CEP não pode estar vazio',
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


function validadeBirthDate(input) {
    const birthDate = new Date(input.value);
    input.setCustomValidity(isOlderThan18(birthDate) ? '' : 'Você precisa ser maior que 18 anos para se cadastrar');
}


function validadeCPF(input) {
    const cpf = input.value.replace(/\D/g, '');
    input.setCustomValidity(isRepeatedCPF(cpf)? 'O cpf digitado não é válido' : '');
}


function isOlderThan18(birthDate) {
    const ano = new Date(birthDate.getUTCFullYear() + 18, birthDate.getUTCMonth(), birthDate.getUTCDate());
    const dateNow = new Date();
    return ano <= dateNow;
}


function isRepeatedCPF(cpf) {
    const repeatedCPFs = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
    ];

    var invalidCPF = false;

    repeatedCPFs.forEach(value => {
        console.log(value)
        if(value == cpf) {
            invalidCPF = true;
        }
    });

    return invalidCPF;
}

function showErrorMessage(inputType, input) {
    let message = '';

    errorTypes.forEach(errorType => {
        if(input.validity[errorType]) {
            message = errorMessages[inputType][errorType];
        }
    })

    return message;
}