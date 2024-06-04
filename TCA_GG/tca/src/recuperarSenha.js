document.addEventListener("DOMContentLoaded", function() {
    const formRecuperarSenha = document.querySelector(".formRecuperarSenha");

    formRecuperarSenha.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita que o formulário seja enviado

        // Captura o e-mail digitado pelo usuário
        const email = document.getElementById("email").value;

        // Recuperando os dados dos usuários cadastrados salvos em localStorage
        const usuariosJSON = localStorage.getItem('usuarios');
        if (usuariosJSON) {
            const usuarios = JSON.parse(usuariosJSON);

            // Verificando se o e-mail fornecido corresponde a algum dos e-mails salvos
            const usuarioEncontrado = usuarios.find(usuario => usuario.email === email);
            if (usuarioEncontrado) {
                // Armazena temporariamente o e-mail do usuário no localStorage
                localStorage.setItem('emailRecuperacao', email);

                // Redireciona o usuário para a página de redefinição de senha
                window.location.href = "redefinirSenha.html";
            } else {
                // Se o e-mail não corresponder a nenhum usuário cadastrado
                alert("O e-mail fornecido não corresponde a nenhum usuário cadastrado. Por favor, verifique o e-mail e tente novamente.");
            }
        } else {
            // Se não houver nenhum usuário cadastrado
            alert("Não há nenhum usuário cadastrado. Por favor, cadastre-se primeiro.");
            // Aqui você pode redirecionar o usuário para a página de cadastro
            // window.location.href = "cadastro.html";
            
        }

    });
});
