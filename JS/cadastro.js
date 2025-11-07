const senhaInput = document.getElementById("senha");

const checkLength = document.getElementById("checkLength");
const checkUpper = document.getElementById("checkUpper");
const checkLower = document.getElementById("checkLower");
const checkNumber = document.getElementById("checkNumber");
const checkSpecial = document.getElementById("checkSpecial");

senhaInput.addEventListener("input", () => {
    const senha = senhaInput.value;

    // Verificações com expressões regulares
    const temMaiuscula = /[A-Z]/.test(senha);
    const temMinuscula = /[a-z]/.test(senha);
    const temNumero = /[0-9]/.test(senha);
    const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
    const tamanhoCerto = senha.length >= 8;

    // Função para atualizar os ícones
    function atualizarIcone(elemento, condicao) {
        if (condicao) {
            elemento.textContent = "✅";
            elemento.classList.add("valid");
        } else {
            elemento.textContent = "❌";
            elemento.classList.remove("valid");
        }
    }

    // Atualiza cada requisito
    atualizarIcone(checkLength, tamanhoCerto);
    atualizarIcone(checkUpper, temMaiuscula);
    atualizarIcone(checkLower, temMinuscula);
    atualizarIcone(checkNumber, temNumero);
    atualizarIcone(checkSpecial, temEspecial);
});


document.addEventListener("DOMContentLoaded", function() {
    const cpfInput = document.querySelector('input[placeholder="Informe seu CPF"]');
    const telefoneInput = document.querySelector('input[placeholder="Telefone"]');
    const botao = document.querySelector('.botao-acessar');

    // ----- MÁSCARA DE CPF -----
    cpfInput.addEventListener("input", function() {
        let value = cpfInput.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 9) {
            cpfInput.value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
        } else if (value.length > 6) {
            cpfInput.value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
        } else if (value.length > 3) {
            cpfInput.value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
        } else {
            cpfInput.value = value;
        }
    });

    // ----- MÁSCARA DE TELEFONE -----
    telefoneInput.addEventListener("input", function() {
        let value = telefoneInput.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 10) {
            telefoneInput.value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        } else if (value.length > 6) {
            telefoneInput.value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
        } else if (value.length > 2) {
            telefoneInput.value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
        } else {
            telefoneInput.value = value;
        }
    });

    // ----- VALIDAÇÃO DE CPF -----
    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        let soma = 0;
        for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf[9])) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf[10])) return false;

        return true;
    }

    // ----- VALIDAÇÃO DE TELEFONE -----
    function validarTelefone(telefone) {
        const numero = telefone.replace(/\D/g, '');
        return numero.length >= 10 && numero.length <= 11;
    }

    // ----- EVENTO DE VALIDAÇÃO ANTES DO ENVIO -----
    botao.addEventListener("click", function(e) {
        e.preventDefault(); // impede envio por enquanto
        const cpfValido = validarCPF(cpfInput.value);
        const telefoneValido = validarTelefone(telefoneInput.value);

        if (!cpfValido) {
            alert("❌ CPF inválido! Verifique e tente novamente.");
            cpfInput.focus();
            return;
        }

        if (!telefoneValido) {
            alert("❌ Telefone inválido! Use o formato (00) 00000-0000.");
            telefoneInput.focus();
            return;
        }

        alert("✅ Cadastro válido! (Aqui você pode enviar para o servidor.)");
    });
});
