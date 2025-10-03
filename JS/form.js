document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('fale-conosco');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    Swal.fire({
      title: 'Mensagem enviada!',
      text: 'Obrigado por entrar em contato. Responderemos em breve.',
      background: 'url(../imagens/pika.gif) no-repeat center/cover',
      color: '#000',
      timer: 3000,               // fecha após 3 segundos
      timerProgressBar: true,
      showConfirmButton: false    // remove o botão
    }).then(() => {
      form.reset();              // reseta o formulário após fechar
    });
  });
});
