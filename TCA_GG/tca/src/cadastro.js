document.addEventListener("DOMContentLoaded", function() {
    const formCadastro = document.getElementById("cadastro");

    formCadastro.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita que o formulário seja enviado

        // Capturando os valores dos campos do formulário
        const nome = document.getElementById("nome_cad").value;
        const email = document.getElementById("email_cad").value;
        const senha = document.getElementById("senha_cad").value;

        // Recuperando os dados dos usuários cadastrados salvos em localStorage
        const usuariosJSON = localStorage.getItem('usuarios');
        let usuarios = [];
        if (usuariosJSON) {
            usuarios = JSON.parse(usuariosJSON);
        }

        // Criando um objeto com os dados do novo usuário
        const novoUsuario = {
            nome: nome,
            email: email,
            senha: senha
        };

        // Adicionando o novo usuário à lista de usuários
        usuarios.push(novoUsuario);

        // Convertendo a lista de usuários de volta para JSON
        const usuariosAtualizadosJSON = JSON.stringify(usuarios);

        // Salvando os dados dos usuários atualizados em localStorage
        localStorage.setItem('usuarios', usuariosAtualizadosJSON);

        // Exemplo simples de mensagem de sucesso
        alert("Cadastro realizado com sucesso!");
        // Redirecionar o usuário para a página inicial
        window.location.href = "inicio.html";
    });
});
