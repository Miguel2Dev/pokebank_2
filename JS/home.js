document.addEventListener('DOMContentLoaded', () => {
    
    // ==============================================
    // 1. FUNCIONALIDADE DOS MODAIS (SERVIÇOS)
    // ==============================================

    const modalTriggers = document.querySelectorAll('[data-modal-target]');
    const modalClosers = document.querySelectorAll('[data-modal-close]');

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.classList.add('modal-open');
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    }

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal-target');
            openModal(modalId);
        });
    });

    modalClosers.forEach(closer => {
        closer.addEventListener('click', () => {
            const modalId = closer.getAttribute('data-modal-close');
            const modal = document.getElementById(modalId);
            closeModal(modal);
        });
    });

    // Fechar modal ao clicar no overlay
    window.addEventListener('click', (event) => {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    // ==============================================
    // 2. FUNCIONALIDADE FALE CONOSCO (FORMULÁRIO)
    // ==============================================
    
    const contactForm = document.getElementById('fale-conosco');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const mensagem = document.getElementById('mensagem').value;

            if (nome && email && mensagem) {
                // Notificação de sucesso
                Swal.fire({
                    title: "Mensagem Enviada!",
                    text: `Obrigado pelo seu contato, ${nome}! Em breve nossa equipe entrará em contato.`,
                    icon: "success",
                    confirmButtonText: "Entendido",
                    confirmButtonColor: "#3085d6"
                });

                this.reset(); 
            } else {
                 Swal.fire({
                    title: "Erro no Envio",
                    text: "Por favor, preencha todos os campos obrigatórios (Nome, E-mail e Dúvida/Assunto).",
                    icon: "error",
                    confirmButtonColor: "#d33"
                });
            }
        });
    }

    // ==============================================
    // 3. FUNCIONALIDADE SIDEBAR (MENU LATERAL)
    // ==============================================

    const sidebar = document.getElementById("user-sidebar");
    const trigger = document.getElementById("open-sidebar-trigger");
    const closeBtn = document.getElementById("close-sidebar");
    const overlay = document.getElementById("sidebar-overlay");

    // Função para abrir o menu
    function openSidebar() {
        if (sidebar) {
            sidebar.style.width = "250px"; 
            overlay.style.display = "block";
            document.body.classList.add('modal-open');
        }
    }

    // Função para fechar o menu
    function closeSidebar() {
        if (sidebar) {
            sidebar.style.width = "0";
            overlay.style.display = "none";
            document.body.classList.remove('modal-open');
        }
    }

    // Evento para abrir o menu (clique na foto/nome do usuário)
    if (trigger) {
        trigger.addEventListener('click', (e) => {
            e.preventDefault(); 
            openSidebar();
        });
    }

    // Evento para fechar o menu (clique no 'X')
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }

    // Evento para fechar o menu (clique no overlay)
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    // ==============================================
    // 4. FUNCIONALIDADE DE LOGOUT (SAIR)
    // ==============================================

    const logoutLink = document.querySelector('.logout-link');

    if (logoutLink) {
        logoutLink.addEventListener('click', function(event) {
            event.preventDefault(); // Impede a navegação padrão
            
            closeSidebar(); // Fecha o sidebar antes de mostrar o modal

            Swal.fire({
                title: 'Tem certeza que deseja sair?',
                text: "Você será desconectado da sua conta PokéBank.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6', 
                cancelButtonColor: '#d33', 
                confirmButtonText: 'Sim, Sair!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // 1. Mensagem de sucesso (opcional)
                    Swal.fire({
                        title: 'Desconectado!',
                        text: 'Até logo, Treinador(a)!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500 
                    }).then(() => {
                        // 2. Redireciona para a página inicial
                        window.location.href = '../HTML/pokebank.html'; 
                    });
                }
            });
        });
    }
});