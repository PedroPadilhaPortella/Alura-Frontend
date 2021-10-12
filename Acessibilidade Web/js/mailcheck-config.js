const emailField = document.querySelector('#email')
const sugestaoSpan = document.querySelector('#sugestaoEmail')

var domains = ['gmail.com', 'hotmail.com', 'outlook.com', 'alura.com.br', 'fatec.sp.gov.br'];
var secondLevelDomains = ['hotmail']
var topLevelDomains = ["com", "net", "org", "br"];

// var superStringDistance = function (string1, string2) {
    // a string distance algorithm of your choosing
// }

document.querySelector('#email').addEventListener('blur', function () {
    Mailcheck.run({
        email: emailField.value,
        domains: domains, // optional
        topLevelDomains: topLevelDomains, // optional
        secondLevelDomains: secondLevelDomains, // optional
        // distanceFunction: superStringDistance, // optional
        suggested: function (suggestion) {
            sugestaoSpan.style.display = 'inline-block';
            sugestaoSpan.textContent = `Você quis dizer: ${suggestion.full} ?`;
            sugestaoSpan.parentNode.classList.add('contatoCampo--erro');
            emailField.classList.add('contatoCampo--validouErro');
            sugestaoSpan.setAttribute('tabindex', '0');
            sugestaoSpan.setAttribute('role', 'alert');
        }
    });
});