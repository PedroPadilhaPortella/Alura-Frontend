/**
 * Função que valida o valor do Input do CEP e retorna uma validação customizada
 * @param {EventTarget} input 
 */
export function validadeCEP(input) {
    const cep = input.value.replace(/\D/g, '');
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const options = { 
        method: 'get', 
        mode: 'cors', 
        headers: { 
            'content-type': 'application/json;charset=utf8'
        }
    };

    if(!input.validity.patternMismatch && !input.validity.valueMissing) {
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if(data.erro == true) {
                    return input.setCustomValidity('Não foi possível encotrar esse Endereço');
                }

                input.setCustomValidity('');
                return fillFieldsWithCEP(data);
            })
    }

}


function fillFieldsWithCEP(data) {
    const logradouro = document.querySelector('[data-tipo="logradouro"]');
    const cidade = document.querySelector('[data-tipo="cidade"]');
    const estado = document.querySelector('[data-tipo="estado"]');

    logradouro.value = data.logradouro;
    cidade.value = data.localidade;
    estado.value = data.uf;
}