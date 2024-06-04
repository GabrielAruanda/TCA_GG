
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