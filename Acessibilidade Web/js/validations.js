const campoCep = document.querySelector('#cep');
console.log(campoCep);

campoCep.oninvalid = function() {
    this.setCustomValidity('');
    
    if(!this.validity.valid) {
        this.setCustomValidity('Ops! Campo de Cep parece estar inválido.');
        this.parentNode.classList.add('contatoCampo--erro')
    }
}