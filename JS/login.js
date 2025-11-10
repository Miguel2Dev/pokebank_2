// Função para alternar visibilidade da senha
function togglePassword(inputId, icon) {
  const input = document.getElementById(inputId);
  if (!input) {
    console.error(`Campo com id="${inputId}" não encontrado.`);
    return;
  }

  const type = input.type === "password" ? "text" : "password";
  input.type = type;

  // Alterna as classes do ícone do Bootstrap Icons
  icon.classList.toggle("bi-eye");
  icon.classList.toggle("bi-eye-slash-fill");
}
