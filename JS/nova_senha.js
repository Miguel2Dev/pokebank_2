// Arquivo: ../JS/nova_senha.js

/**
 * Função para alternar a visibilidade da senha (ícone de olho)
 */
function togglePassword(id, icon) {
    const input = document.getElementById(id);
    
    // É importante garantir que o input existe
    if (input) {
        if (input.type === "password") {
            input.type = "text";
            icon.classList.remove("bi-eye-slash-fill");
            icon.classList.add("bi-eye-fill");
        } else {
            input.type = "password";
            icon.classList.remove("bi-eye-fill");
            icon.classList.add("bi-eye-slash-fill");
        }
    }
}

/**
 * Lógica de validação de senhas e redirecionamento
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Captura os elementos necessários (input senhas e o botão)
    const btnReformular = document.getElementById('btnReformular');
    const senha1 = document.getElementById('senha1');
    const senha2 = document.getElementById('senha2');
    
    // 2. Verifica se todos os elementos foram carregados antes de adicionar o listener
    if (btnReformular && senha1 && senha2) {
        
        // 3. Adiciona o ouvinte de evento 'click' ao botão
        btnReformular.addEventListener('click', (event) => {
            event.preventDefault(); // Impede que o link recarregue a página
            
            const novaSenha = senha1.value.trim();
            const confirmarSenha = senha2.value.trim();
            
            // Validação de campos vazios
            if (novaSenha === "" || confirmarSenha === "") {
                alert("Por favor, preencha ambos os campos de senha.");
                return; 
            }
            
            // 4. Validação: Verifica se as senhas são iguais
            if (novaSenha === confirmarSenha) {
                
                // *** Ponto de Backend ***
                // Chame sua API aqui para realmente salvar a nova senha no servidor.
                console.log("Validação OK. Senha pronta para envio:", novaSenha);
                
                // 5. Sucesso: Mensagem e Redirecionamento
                alert("Sua senha foi reformulada com sucesso!");
                
                // Redireciona para a página de login
                // ATENÇÃO: Verifique o caminho '../login.html'
                window.location.href = '../HTML/login.html'; 
                
            } else {
                // 6. Falha: Senhas diferentes
                alert("Erro: As senhas digitadas não são iguais. Por favor, verifique.");
                senha1.value = ''; // Limpa os campos para nova tentativa
                senha2.value = '';
                senha1.focus(); 
            }
        });
        
    } else {
        console.error("Erro no script: Não foi possível encontrar os IDs 'btnReformular', 'senha1' ou 'senha2'. Verifique o HTML.");
    }
});