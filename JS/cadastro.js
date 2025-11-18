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
    // Inputs do Formulário Principal
    const cpfInput = document.querySelector('input[placeholder="Informe seu CPF"]');
    const telefoneInput = document.querySelector('input[placeholder="Telefone"]');
    const senha = document.getElementById('senha');
    const confirmarSenha = document.getElementById('confirmarSenha'); 
    const toggleSenha = document.getElementById('toggleSenha');
    const toggleConfirmarSenha = document.getElementById('toggleConfirmarSenha');
    const botao = document.querySelector('.botao-acessar');

    // **NOVOS INPUTS DO MODAL**
    const cpfResponsavelInput = document.getElementById('cpfResponsavel');
    const telefoneResponsavelInput = document.getElementById('telefoneResponsavel');


    // ===================================
    // Lógica de Mostrar/Ocultar Senha (Existente)
    // ===================================
    function setupPasswordToggle(inputEl, toggleEl) {
        if (toggleEl) {
            toggleEl.textContent = '👁️'; 
            
            toggleEl.addEventListener('click', function() {
                const type = inputEl.getAttribute('type') === 'password' ? 'text' : 'password';
                inputEl.setAttribute('type', type);
                
                if (type === 'text') {
                    toggleEl.textContent = '🔒';
                } else {
                    toggleEl.textContent = '👁️';
                }
                inputEl.focus(); 
            });
        }
    }

    setupPasswordToggle(senha, toggleSenha);
    setupPasswordToggle(confirmarSenha, toggleConfirmarSenha);
    // ===================================

    // ----- FUNÇÕES DE MÁSCARA REUTILIZÁVEIS -----
    function aplicarMascaraCPF(input) {
        let value = input.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 9) {
            input.value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
        } else if (value.length > 6) {
            input.value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
        } else if (value.length > 3) {
            input.value = value.replace(/(\d{3})(\d{1,3})/, "$1.$2");
        } else {
            input.value = value;
        }
    }

    function aplicarMascaraTelefone(input) {
        let value = input.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 10) {
            input.value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        } else if (value.length > 6) {
            input.value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
        } else if (value.length > 2) {
            input.value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
        } else {
            input.value = value;
        }
    }
    // ---------------------------------------------

    // ----- APLICAÇÃO DAS MÁSCARAS (FORMULÁRIO PRINCIPAL) -----
    cpfInput.addEventListener("input", () => aplicarMascaraCPF(cpfInput));
    telefoneInput.addEventListener("input", () => aplicarMascaraTelefone(telefoneInput));

    // **NOVO: APLICAÇÃO DAS MÁSCARAS (MODAL RESPONSÁVEL)**
    if (cpfResponsavelInput) {
        cpfResponsavelInput.addEventListener("input", () => aplicarMascaraCPF(cpfResponsavelInput));
    }
    if (telefoneResponsavelInput) {
        telefoneResponsavelInput.addEventListener("input", () => aplicarMascaraTelefone(telefoneResponsavelInput));
    }

    // ----- FUNÇÕES DE VALIDAÇÃO REUTILIZÁVEIS -----
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

    function validarTelefone(telefone) {
        const numero = telefone.replace(/\D/g, '');
        return numero.length >= 10 && numero.length <= 11;
    }
    
    function validarRequisitosSenha() {
        return checkLength.textContent === "✅" &&
                checkUpper.textContent === "✅" &&
                checkLower.textContent === "✅" &&
                checkNumber.textContent === "✅" &&
                checkSpecial.textContent === "✅";
    }

    // ----- EVENTO DE VALIDAÇÃO ANTES DO ENVIO (FORMULÁRIO PRINCIPAL) -----
    botao.addEventListener("click", function(e) {
        e.preventDefault();
        
        // 1. Validação de Senhas Iguais
        if (senha.value !== confirmarSenha.value) {
            alert("❌ As senhas não coincidem! Digite a mesma senha em ambos os campos.");
            confirmarSenha.focus();
            return;
        }
        
        // 2. Validação de Requisitos da Senha
        if (!validarRequisitosSenha()) {
            alert("❌ A senha não atende a todos os requisitos listados.");
            senha.focus();
            return;
        }

        // 3. Validação de CPF e Telefone
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

        window.location.replace('../HTML/home.html');
    });
    // ------------------------------------------------------------------


    // ===================================
    // Lógica para o botão de Concluir do Responsável (Atualizada com Validação)
    // ===================================
    const modalResponsavel = document.getElementById('modalResponsavel');
    const btnConcluirResponsavel = document.getElementById('btnConcluirResponsavel');

    btnConcluirResponsavel.addEventListener('click', function(e) {
        e.preventDefault(); 
        
        const nomeResponsavel = document.getElementById('nomeResponsavel').value;
        const cpfResponsavel = cpfResponsavelInput.value;
        const telefoneResponsavel = telefoneResponsavelInput.value;
        
        // **NOVO: Validação do CPF e Telefone do Responsável**
        const cpfResponsavelValido = validarCPF(cpfResponsavel);
        const telefoneResponsavelValido = validarTelefone(telefoneResponsavel);

        if (!nomeResponsavel) {
            alert("❌ Por favor, preencha o Nome do responsável.");
            document.getElementById('nomeResponsavel').focus();
            return;
        }
        
        if (!cpfResponsavelValido) {
            alert("❌ CPF do responsável inválido! Verifique e tente novamente.");
            cpfResponsavelInput.focus();
            return;
        }

        if (!telefoneResponsavelValido) {
            alert("❌ Telefone do responsável inválido! Use o formato (00) 00000-0000.");
            telefoneResponsavelInput.focus();
            return;
        }
        // FIM DA VALIDAÇÃO DO MODAL

        // Se todas as validações passarem
        modalResponsavel.classList.add('modal-oculto');
        alert("Dados do responsável coletados e válidos! Por favor, continue com os outros campos do formulário principal.");
        // **AQUI: Lógica para armazenar os dados do responsável.**
    });

});

// Função para calcular a idade com base na data de nascimento
function calcularIdade(dataNasc) {
    const hoje = new Date();
    const nascimento = new Date(dataNasc);
    
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    
    // Ajusta a idade se o aniversário ainda não passou neste ano
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    return idade;
}

// ===================================
// Elementos HTML para Controle do Modal (Existente)
// ===================================
const inputDataNascimento = document.getElementById('dataNascimento');
const modalResponsavel = document.getElementById('modalResponsavel');
const btnFecharModal = document.getElementById('fecharModal');

// 1. Evento que verifica a idade ao alterar o campo de data de nascimento
inputDataNascimento.addEventListener('change', function() {
    const dataDigitada = this.value; 
    
    if (dataDigitada) {
        const idade = calcularIdade(dataDigitada);
        
        if (idade < 18) {
            // Se for menor de 18, exibe o modal
            modalResponsavel.classList.remove('modal-oculto');
        } else {
            // Se for maior ou igual a 18, garante que o modal esteja oculto
            modalResponsavel.classList.add('modal-oculto');
        }
    }
});

// 2. Evento para fechar o modal
btnFecharModal.addEventListener('click', function() {
    modalResponsavel.classList.add('modal-oculto');
    
    // Limpa o campo de data de nascimento do menor se o processo for cancelado
    inputDataNascimento.value = ''; 
});