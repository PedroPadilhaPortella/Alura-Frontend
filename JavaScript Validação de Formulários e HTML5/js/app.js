import {
    validate
} from './validacao.js';

const inputs = document.querySelectorAll('input');

inputs.forEach(input => {

    if (input.dataset.tipo == 'preco') {
        input = SimpleMaskMoney.setMask(input, {
            allowNegative: false,
            prefix: 'R$ ',
            fixed: true,
            fractionDigits: 2,
            decimalSeparator: ',',
            thousandsSeparator: '.',
            cursor: 'end'
        });
    }


    input.addEventListener('blur', (event) => {
        validate(event.target);
    })
})