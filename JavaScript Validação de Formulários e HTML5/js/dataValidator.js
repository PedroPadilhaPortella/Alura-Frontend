/**
 * 
 * @param {EventTarget} input 
 */
export function validadeBirthDate(input) {
    const birthDate = new Date(input.value);
    input.setCustomValidity(isOlderThan18(birthDate) ? '' : 'Você precisa ser maior que 18 anos para se cadastrar');
}

/**
 * 
 * @param {Date} birthDate 
 * @returns 
 */
function isOlderThan18(birthDate) {
    const ano = new Date(birthDate.getUTCFullYear() + 18, birthDate.getUTCMonth(), birthDate.getUTCDate());
    const dateNow = new Date();
    return ano <= dateNow;
}