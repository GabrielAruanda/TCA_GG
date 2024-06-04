document.addEventListener("DOMContentLoaded", function() {
    const formLogin = document.querySelector(".formLogin");

    formLogin.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita que o formulário seja enviado

        // Capturando os valores dos campos do formulário de login
        const email = document.querySelector("input[type='email']").value;
        const senha = document.querySelector("input[type='password']").value;

        // Recuperando os dados dos usuários cadastrados salvos em localStorage
        const usuariosJSON = localStorage.getItem('usuarios');
        if (usuariosJSON) {
            const usuarios = JSON.parse(usuariosJSON);

            // Verificando se o email e a senha informados correspondem aos dados salvos
            const usuarioEncontrado = usuarios.find(usuario => usuario.email === email && usuario.senha === senha);
            if (usuarioEncontrado) {
                // Login bem-sucedido
                alert("Login realizado com sucesso!");
                // Redirecionar o usuário para a página inicial
                window.location.href = "inicio.html";
            } else {
                // Email ou senha incorretos
                alert("Email ou senha incorretos. Por favor, tente novamente.");
            }
        } else {
            // Não há dados de usuário salvos
            alert("Não há dados de usuário salvos. Por favor, cadastre-se primeiro.");
            // Aqui você pode redirecionar o usuário para a página de cadastro
            // window.location.href = "cadastro.html";
        }
    });
});

