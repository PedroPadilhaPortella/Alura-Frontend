/**
 * Função que valida o valor do Input do CPF e retorna uma validação customizada
 * @param {EventTarget} input 
 */
export function validadeCPF(input) {
    const cpf = input.value.replace(/\D/g, '');
    input.setCustomValidity((isRepeatedCPF(cpf) || !isCPFStructureValid(cpf))? 'O cpf digitado não é válido' : '');
}


/**
 * Função que checa se a estrutura do cpf é válida
 * @param {string} cpf 
 * @returns boolean: Se a estrutura do cpf é válida
 */
function isCPFStructureValid(cpf) {
    const multiplier = 10;
    return isVerifierDigitValid(cpf, multiplier);
}


/**
 * Função que checa se o dígito verificador bate com o dígito de confirmação em cada algaritmos dos 9 primeiros do cpf
 * @param {string} cpf 
 * @param {number} multiplier 
 * @returns boolean: Se o dígito verificador bate com o dígito de confirmação em cada algaritmos dos 9 primeiros do cpf
 */
function isVerifierDigitValid(cpf, multiplier) {
    if(multiplier >= 12) {
        return true;
    }
    
    let initialMultiplier = multiplier;
    let sum = 0;
    const cpfWithoutDigits = cpf.substr(0, multiplier - 1).split('');
    const verifierDigit = cpf.charAt(multiplier - 1);

    for (let i = 0; initialMultiplier > 1; initialMultiplier--) {
        sum = sum + cpfWithoutDigits[i] * initialMultiplier;
        i++;
    }

    if(verifierDigit == confirmDigit(sum) || (verifierDigit == 0 && confirmDigit(sum) == 10)) {
        return isVerifierDigitValid(cpf, multiplier + 1);
    }

    return false;
}


/**
 * Função que confirma o dígito
 * @param {number} sum Soma de cada algarismo dos 9 primeiros do cpf multiplicados pela sua posição
 * @returns number: (sum * 10) % 11
 */
function confirmDigit(sum) {
    if(sum % 11 == 0)  return 0;
    return (sum * 10) % 11;
}


/**
 * Função que checa se os valores do cpf são uma sequência de algarismos repetidos
 * @param {string} cpf 
 * @returns boolean: Se o CPF é uma sequência repetida ou não
 */
function isRepeatedCPF(cpf) {
    var invalidCPF = false;
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

    repeatedCPFs.forEach(value => {
        if(value == cpf) invalidCPF = true;
    });
    return invalidCPF;
}


/**
 * Função que apresenta outra opção de solução para a validação de CPF
 * @param {str} cpf 
 * @returns booleam: CPF é valido ou não
 */
function cpfValido(cpf) {
    let soma1 = 0;

    for(let i = 0; i < cpf.length - 2; i++) {
        soma1 += (10 - i) * cpf[i];
    }

    let soma2 = 0;
    for(let i = 0; i < cpf.length - 1; i++) {
        soma2 += (11 - i) * cpf[i]; 
    }

    const digVerificadorCalculado1 = 11 - (soma1 % 11);
    const digVerificadorCalculado2 = 11 - (soma2 % 11);
    const digVerificadorCPF1 = cpf.slice(9,10);
    const digVerificadorCPF2 = cpf.slice(10,11);

    return digVerificadorCalculado1 == digVerificadorCPF1 && digVerificadorCalculado2 == digVerificadorCPF2;
}