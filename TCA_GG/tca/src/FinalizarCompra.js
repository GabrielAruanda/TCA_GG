function adicionarAoCarrinho(nome, preco) {
    const carrinho = document.getElementById('lista-carrinho');
    const itensCarrinho = carrinho.children;
    let itemExistente = null;

    // Verifica se o item já existe no carrinho
    for (let i = 0; i < itensCarrinho.length; i++) {
        const item = itensCarrinho[i];
        if (item.textContent.includes(nome)) {
            itemExistente = item;
            break;
        }
    }

    if (itemExistente) {
        const quantidadeElemento = itemExistente.querySelector('.quantidade');
        const quantidade = parseInt(quantidadeElemento.textContent) + 1;
        quantidadeElemento.textContent = quantidade;
        const valorTotalElemento = itemExistente.querySelector('.valor-total');
        const valorTotal = parseFloat(valorTotalElemento.textContent.split('R$ ')[1]) + preco;
        valorTotalElemento.textContent = `Total: R$ ${valorTotal.toFixed(2)}`;
    } else {
        const novoItem = document.createElement('li');
        const idItem = 'item-' + nome.replace(/\s+/g, '-').toLowerCase();
        novoItem.setAttribute('id', idItem);
        novoItem.innerHTML = `${nome} - Quantidade: <span class="quantidade">1</span> - Total: <span class="valor-total">R$ ${preco.toFixed(2)}</span>
                             <button class="bt-rm" onclick="removerDoCarrinho('${idItem}', ${preco})">Remover</button>`;
        carrinho.appendChild(novoItem);
    }

    // Atualizar total da compra
    const totalCompra = parseFloat(localStorage.getItem('totalCompra')) || 0;
    localStorage.setItem('totalCompra', (totalCompra + preco).toFixed(2));
}

function calcularTotalCompra() {
    return parseFloat(localStorage.getItem('totalCompra')) || 0;
}

function removerDoCarrinho(idItem, preco) {
    const quantidade = parseInt(prompt("Quantos itens você deseja remover?"));
    if (!quantidade || quantidade < 1) {
        alert("Por favor, insira uma quantidade válida.");
        return;
    }

    const itemRemover = document.getElementById(idItem);
    const quantidadeElemento = itemRemover.querySelector('.quantidade');
    const quantidadeAtual = parseInt(quantidadeElemento.textContent);

    if (quantidade > quantidadeAtual) {
        alert("Você não pode remover mais itens do que os que estão no carrinho.");
        return;
    }

    if (quantidade === quantidadeAtual) {
        itemRemover.remove();
    } else {
        quantidadeElemento.textContent = quantidadeAtual - quantidade;
        const valorTotalElemento = itemRemover.querySelector('.valor-total');
        const valorTotalAtual = parseFloat(valorTotalElemento.textContent.split('R$ ')[1]);
        valorTotalElemento.textContent = `Total: R$ ${(valorTotalAtual - quantidade * preco).toFixed(2)}`;
    }

    // Atualizar total da compra
    const totalCompra = parseFloat(localStorage.getItem('totalCompra')) || 0;
    localStorage.setItem('totalCompra', (totalCompra - quantidade * preco).toFixed(2));
}


function confirmarCompra() {
    const nome = document.getElementById('nome').value.trim();
    const sobrenome = document.getElementById('sobrenome').value.trim();
    const email = document.getElementById('email').value.trim();
    const endereco = document.getElementById('endereco').value.trim();

    // Validar se todos os campos foram preenchidos
    if (!nome || !sobrenome || !email || !endereco) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Verificar se uma forma de pagamento foi selecionada
    const formaPagamentoSelecionada = document.querySelector('input[name="pagamento"]:checked');
    if (!formaPagamentoSelecionada) {
        alert('Por favor, selecione uma forma de pagamento.');
        return;
    }

    const formaPagamento = formaPagamentoSelecionada.value;

    // Calcular o total da compra
    const totalCompra = calcularTotalCompra();

    // Salvar informações do usuário no localStorage
    const usuario = {
        nome: nome + ' ' + sobrenome,
        email: email,
        endereco: endereco,
        formaPagamento: formaPagamento,
        totalCompra: totalCompra
    };
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // Verificar se a forma de pagamento selecionada permite parcelamento
    if (formaPagamento === 'credito' || formaPagamento === 'boleto') {
        const numParcelas = document.getElementById('numParcelas').value;
        localStorage.setItem('numParcelas', numParcelas);
    }

    // Redirecionar o usuário para a página de confirmação
    console.log('Redirecionando para a página de comprovante...');
    window.location.href = 'comprovante.html';
}
function adicionarAoCarrinho(nome, preco) {
    const carrinho = document.getElementById('lista-carrinho');
    const itensCarrinho = carrinho.children;
    let itemExistente = null;

    // Verifica se o item já existe no carrinho
    for (let i = 0; i < itensCarrinho.length; i++) {
        const item = itensCarrinho[i];
        if (item.textContent.includes(nome)) {
            itemExistente = item;
            break;
        }
    }

    if (itemExistente) {
        const quantidadeElemento = itemExistente.querySelector('.quantidade');
        const quantidade = parseInt(quantidadeElemento.textContent) + 1;
        quantidadeElemento.textContent = quantidade;
        const valorTotalElemento = itemExistente.querySelector('.valor-total');
        const valorTotal = parseFloat(valorTotalElemento.textContent.split('R$ ')[1]) + preco;
        valorTotalElemento.textContent = `Total: R$ ${valorTotal.toFixed(2)}`;
    } else {
        const novoItem = document.createElement('li');
        const idItem = 'item-' + nome.replace(/\s+/g, '-').toLowerCase();
        novoItem.setAttribute('id', idItem);
        novoItem.innerHTML = `${nome} - Quantidade: <span class="quantidade">1</span> - Total: <span class="valor-total">R$ ${preco.toFixed(2)}</span>
                             <button class="bt-rm" onclick="removerDoCarrinho('${idItem}', ${preco})">Remover</button>`;
        carrinho.appendChild(novoItem);
    }

    // Atualizar total da compra
    const totalCompra = parseFloat(localStorage.getItem('totalCompra')) || 0;
    localStorage.setItem('totalCompra', (totalCompra + preco).toFixed(2)); // Adicionando o preço do item ao total da compra
}
function adicionarAoCarrinho(nome, preco) {
    const carrinho = document.getElementById('lista-carrinho');
    const itensCarrinho = carrinho.children;
    let itemExistente = null;

    // Verifica se o item já existe no carrinho
    for (let i = 0; i < itensCarrinho.length; i++) {
        const item = itensCarrinho[i];
        if (item.textContent.includes(nome)) {
            itemExistente = item;
            break;
        }
    }

    if (itemExistente) {
        const quantidadeElemento = itemExistente.querySelector('.quantidade');
        const quantidade = parseInt(quantidadeElemento.textContent) + 1;
        quantidadeElemento.textContent = quantidade;
        const valorTotalElemento = itemExistente.querySelector('.valor-total');
        const valorTotal = parseFloat(valorTotalElemento.textContent.split('R$ ')[1]) + preco;
        valorTotalElemento.textContent = `Total: R$ ${valorTotal.toFixed(2)}`;
    } else {
        const novoItem = document.createElement('li');
        const idItem = 'item-' + nome.replace(/\s+/g, '-').toLowerCase();
        novoItem.setAttribute('id', idItem);
        novoItem.innerHTML = `${nome} - Quantidade: <span class="quantidade">1</span> - Total: <span class="valor-total">R$ ${preco.toFixed(2)}</span>
                             <button class="bt-rm" onclick="removerDoCarrinho('${idItem}', ${preco})">Remover</button>`;
        carrinho.appendChild(novoItem);
    }


document.addEventListener("DOMContentLoaded", function() {
    const totalCompraElement = document.getElementById('total');
    const totalCompra = localStorage.getItem('totalCompra');

    if (totalCompra) {
        totalCompraElement.textContent = `R$ ${totalCompra}`;
    } else {
        totalCompraElement.textContent = "N/A";
    }
});

}

// Script para exibir o total da compra ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    const totalCompraElement = document.getElementById('total');
    const totalCompra = localStorage.getItem('totalCompra');

    if (totalCompra) {
        totalCompraElement.textContent = `R$ ${totalCompra}`;
    } else {
        totalCompraElement.textContent = "N/A";
    }

    // Adicionar evento de mudança para mostrar a seção de parcelas quando a opção de pagamento for selecionada
    const formaPagamento = document.getElementById('forma-pagamento');
    const parcelas = document.getElementById('parcelas');

    formaPagamento.addEventListener('change', function() {
        if (credito.checked || boleto.checked) {
            parcelas.style.display = 'block';
        } else {
            parcelas.style.display = 'none';
        }
    });
});
