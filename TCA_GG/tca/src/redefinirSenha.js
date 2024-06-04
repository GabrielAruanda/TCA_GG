document.addEventListener("DOMContentLoaded", function() {
    const formRedefinirSenha = document.getElementById("formRedefinirSenha");

    formRedefinirSenha.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita que o formulário seja enviado

        // Captura a nova senha digitada pelo usuário
        const novaSenha = document.getElementById("novaSenha").value;

        // Recupera o e-mail do usuário que solicitou a redefinição de senha
        const emailRecuperacao = localStorage.getItem('emailRecuperacao');

        // Recupera os dados do usuário do localStorage
        const usuariosJSON = localStorage.getItem('usuarios');
        if (usuariosJSON) {
            const usuarios = JSON.parse(usuariosJSON);

            // Encontra o usuário com o e-mail correspondente
            const usuario = usuarios.find(user => user.email === emailRecuperacao);
            if (usuario) {
                // Atualiza a senha do usuário com a nova senha
                usuario.senha = novaSenha;

                // Salva os dados atualizados do usuário de volta no localStorage
                localStorage.setItem('usuarios', JSON.stringify(usuarios));

                // Exibe uma mensagem de sucesso para o usuário
                alert("Senha redefinida com sucesso para o e-mail: " + emailRecuperacao);

                // Limpa o e-mail de recuperação armazenado temporariamente no localStorage
                localStorage.removeItem('emailRecuperacao');

                // Redireciona o usuário de volta para a página de login
                window.location.href = "login.html";
            } else {
                alert("Ocorreu um erro ao recuperar os dados do usuário. Por favor, tente novamente.");
            }
        } else {
            alert("Não há usuários cadastrados. Por favor, cadastre-se primeiro.");
        }
    });
});

