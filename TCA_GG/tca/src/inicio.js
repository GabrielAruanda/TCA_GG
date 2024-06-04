
var MenuItens = document.getElementById("MenuItens");

MenuItens.style.maxHeight = "0px";

function menucelular() {
    if (MenuItens.style.maxHeight === "0px") {
        MenuItens.style.maxHeight = "200px";
    } else {
        MenuItens.style.maxHeight = "0px";
    }
}


inicializarLoja();

function atualizarCarrinho() {
    var containerCarrinho = document.getElementById('carrinho');
    containerCarrinho.innerHTML = ''; // Limpa o conteúdo do carrinho para atualização

    itens.forEach(function (item) {
        console.log(item.nome);
        if(item.quantidade > 0){
            containerCarrinho.innerHTML += `
            <p>`+item.nome+` | quantidade: `+item.quantidade+`</p>
            <hr>
            `;
        }
    });
}

var links = document.getElementsByTagName('a');

for(var i = 0; i< links.length; i++){
    links[i].addEventListener("click", function(){
        let key = this.getAttribute ('key');
        itens[key].quantidade++;
        atualizarCarrinho();
        return false;
    });
}

        // Função para adicionar um item ao carrinho
        function adicionarAoCarrinho(nome, preco) {
            const carrinho = document.getElementById('lista-carrinho');
            const novoItem = document.createElement('li');
            novoItem.innerHTML = `${nome} - R$ ${preco} <button onclick="removerDoCarrinho(this)">Remover</button>`;
            carrinho.appendChild(novoItem);
        }

        // Função para remover um item do carrinho
        function removerDoCarrinho(botaoRemover) {
            const itemRemovido = botaoRemover.parentNode;
            itemRemovido.parentNode.removeChild(itemRemovido);
        }

        // Função para limpar todo o carrinho
        function limparCarrinho() {
            const carrinho = document.getElementById('lista-carrinho');
            carrinho.innerHTML = '';
        }
        document.addEventListener("DOMContentLoaded", function() {
            // Verificar se o usuário está cadastrado
            const usuarioCadastrado = JSON.parse(localStorage.getItem('usuario'));
        
            if (usuarioCadastrado) {
                // Exibir mensagem de usuário cadastrado
                document.getElementById('mensagem-usuario-cadastrado').style.display = 'block';
            }

          
    // Verificar se há um usuário cadastrado no armazenamento local
    function verificarLogin() {
        const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];
        return usuariosCadastrados.length > 0; // Retorna true se houver algum usuário cadastrado
    }

    // Função para exibir uma mensagem se o usuário estiver logado
    function exibirMensagemLogin() {
        const usuarioLogado = verificarLogin();
        const userStatus = document.querySelector('.user-status');

        if (usuarioLogado) {
            userStatus.innerHTML = '<p>Você está logado!</p>';
        } else {
            userStatus.innerHTML = ''; // Limpa a mensagem se não houver usuário logado
        }
    }

    // Chama a função para verificar e exibir o status do login quando a página for carregada
    window.addEventListener('load', exibirMensagemLogin);


        });
        