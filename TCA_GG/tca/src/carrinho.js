let carrinho = [];

function adicionarAoCarrinho(nome, preco, imgSrc) {
    const carrinhoElemento = document.getElementById('lista-carrinho');
    const itensCarrinho = carrinhoElemento.children;
    let itemExistente = null;

    // Verifica se o item já existe no carrinho
    for (let i = 0; i < itensCarrinho.length; i++) {
        const item = itensCarrinho[i];
        if (item.querySelector('.nome-item').textContent.includes(nome)) {
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

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = nome;
        img.style.width = '50px';
        img.style.marginRight = '10px';

        const nomeItem = document.createElement('span');
        nomeItem.classList.add('nome-item');
        nomeItem.textContent = nome;

        const quantidadeSpan = document.createElement('span');
        quantidadeSpan.classList.add('quantidade');
        quantidadeSpan.textContent = '1';

        const valorTotalSpan = document.createElement('span');
        valorTotalSpan.classList.add('valor-total');
        valorTotalSpan.textContent = `Total: R$ ${preco.toFixed(2)}`;

        const removerBtn = document.createElement('button');
        removerBtn.classList.add('bt-rm');
        removerBtn.textContent = 'Remover';
        removerBtn.onclick = function () {
            removerDoCarrinho(idItem, preco);
        };

        novoItem.appendChild(img);
        novoItem.appendChild(nomeItem);
        novoItem.appendChild(document.createTextNode(' - Quantidade: '));
        novoItem.appendChild(quantidadeSpan);
        novoItem.appendChild(document.createTextNode(' - '));
        novoItem.appendChild(valorTotalSpan);
        novoItem.appendChild(removerBtn);

        carrinhoElemento.appendChild(novoItem);
    }

    // Atualizar total da compra
    atualizarTotalCompra(preco);
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
    atualizarTotalCompra(-quantidade * preco);
}

function limparCarrinho() {
    const carrinhoElemento = document.getElementById('lista-carrinho');
    carrinhoElemento.innerHTML = '';
    atualizarTotalCompra(0, true); // Reseta o total da compra
}

function atualizarTotalCompra(valor, reset = false) {
    const totalCompra = document.getElementById('total-compra');
    if (reset) {
        totalCompra.textContent = `Total: R$ 0.00`;
    } else {
        const totalAnterior = parseFloat(totalCompra.textContent.split('R$ ')[1]);
        totalCompra.textContent = `Total: R$ ${(totalAnterior + valor).toFixed(2)}`;
    }
}

function finalizarCompra() {
    // Salvar o total da compra em localStorage
    salvarTotalCompra();

    // Limpar o carrinho após a compra
    limparCarrinho();

    // Redirecionar para a página finalizarCompra.html
    window.location.href = "finalizarCompra.html";
}

function calcularTotalCompra() {
    const carrinhoElemento = document.getElementById('lista-carrinho');
    const itensCarrinho = carrinhoElemento.getElementsByTagName('li');
    let total = 0;

    for (let i = 0; i < itensCarrinho.length; i++) {
        const valorTotalElemento = itensCarrinho[i].querySelector('.valor-total');
        const valorTotal = parseFloat(valorTotalElemento.textContent.split('R$ ')[1]);
        total += valorTotal;
    }

    return total.toFixed(2);
}

function salvarTotalCompra() {
    const totalCompra = calcularTotalCompra();
    localStorage.setItem('totalCompra', totalCompra);
}
function adicionarAoCarrinho(nome, preco, imgSrc) {
    const carrinhoElemento = document.getElementById('lista-carrinho');
    const itensCarrinho = carrinhoElemento.children;
    let itemExistente = null;

    // Verifica se o item já existe no carrinho
    for (let i = 0; i < itensCarrinho.length; i++) {
        const item = itensCarrinho[i];
        if (item.querySelector('.nome-item').textContent.includes(nome)) {
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

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = nome;

        const itemInfo = document.createElement('div');
        itemInfo.classList.add('item-info');

        const nomeItem = document.createElement('span');
        nomeItem.classList.add('nome-item');
        nomeItem.textContent = nome;

        const quantidadeSpan = document.createElement('span');
        quantidadeSpan.classList.add('quantidade');
        quantidadeSpan.textContent = '1';

        const valorTotalSpan = document.createElement('span');
        valorTotalSpan.classList.add('valor-total');
        valorTotalSpan.textContent = `Total: R$ ${preco.toFixed(2)}`;

        const removerBtn = document.createElement('button');
        removerBtn.classList.add('bt-rm');
        removerBtn.textContent = 'Remover';
        removerBtn.onclick = function () {
            removerDoCarrinho(idItem, preco);
        };

        itemInfo.appendChild(nomeItem);
        itemInfo.appendChild(document.createTextNode(' - Quantidade: '));
        itemInfo.appendChild(quantidadeSpan);
        itemInfo.appendChild(document.createTextNode(' - '));
        itemInfo.appendChild(valorTotalSpan);

        novoItem.appendChild(img);
        novoItem.appendChild(itemInfo);
        novoItem.appendChild(removerBtn);

        carrinhoElemento.appendChild(novoItem);
    }

    // Atualizar total da compra
    atualizarTotalCompra(preco);
}
