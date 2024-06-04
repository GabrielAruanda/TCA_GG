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
    const totalCompra = document.getElementById('total-compra');
    const totalAnterior = parseFloat(totalCompra.textContent.split('R$ ')[1]);
    totalCompra.textContent = `Total: R$ ${(totalAnterior + preco).toFixed(2)}`;
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
    const totalCompra = document.getElementById('total-compra');
    const totalAnterior = parseFloat(totalCompra.textContent.split('R$ ')[1]);
    totalCompra.textContent = `Total: R$ ${(totalAnterior - quantidade * preco).toFixed(2)}`;
}


// Função para limpar todo o carrinho
function limparCarrinho() {
    const carrinho = document.getElementById('lista-carrinho');
    carrinho.innerHTML = '';
}

function finalizarCompra() {
    const carrinho = document.getElementById('lista-carrinho');
    const itensCarrinho = carrinho.getElementsByTagName('li');

    // Verificar se o carrinho está vazio
    if (itensCarrinho.length === 0) {
        alert('O carrinho está vazio.');
        return;
    }

    // Objeto para armazenar os itens do carrinho e suas quantidades
    const carrinhoItens = {};

    // Iterar sobre os itens do carrinho
    for (let i = 0; i < itensCarrinho.length; i++) {
        const nome = itensCarrinho[i].textContent.split(' - ')[0];
        const preco = parseFloat(itensCarrinho[i].textContent.split('R$ ')[1]);

        // Verificar se o item já está no carrinho
        if (carrinhoItens[nome]) {
            carrinhoItens[nome].quantidade += 1;
        } else {
            carrinhoItens[nome] = {
                preco: preco,
                quantidade: 1
            };
        }
    }

    // Calcular o total da compra
    let total = 0;
    let mensagemCompra = 'Itens selecionados:\n';
    for (const item in carrinhoItens) {
        const precoTotalItem = carrinhoItens[item].preco * carrinhoItens[item].quantidade;
        total += precoTotalItem;
        mensagemCompra += `${item} - Quantidade: ${carrinhoItens[item].quantidade} - Total: R$ ${precoTotalItem.toFixed(2)}\n`;
    }

    let nome;
    do {
        nome = prompt("Digite seu nome completo (Nome Sobrenome):");
        if (!nome.includes(" ")) {
            alert("Por favor, insira seu nome completo (Nome Sobrenome).");
        }
    } while (!nome.includes(" "));

    let email;
    do {
        email = prompt("Digite seu e-mail:");
        if (!email.includes("@")) {
            alert("Por favor, insira um e-mail válido.");
        }
    } while (!email.includes("@"));

    let endereco;
    do {
        endereco = prompt("Digite seu endereço:");
        if (!endereco) {
            alert("Por favor, insira seu endereço.");
        }
    } while (!endereco);

    const formaPagamento = prompt("Por favor, selecione a forma de pagamento: \n1 - Crédito\n2 - Débito\n3 - PIX\n4 - Boleto");
    let formaPagamentoTexto;
    let detalhesPagamento = '';
    let chavePix = '';
    switch (formaPagamento) {
        case "1":
            formaPagamentoTexto = "Crédito";
            const parcelas = parseInt(prompt("Digite o número de parcelas desejado:"));
            const valorParcela = total / parcelas;
            detalhesPagamento = `- Parcelas: ${parcelas}x de R$ ${valorParcela.toFixed(2)}`;
            break;
        case "2":
            formaPagamentoTexto = "Débito";
            break;
        case "3":
            formaPagamentoTexto = "PIX";
            chavePix = generateRandomKey();
            detalhesPagamento = `- Chave PIX: ${chavePix}`;
            break;
        case "4":
            formaPagamentoTexto = "Boleto";
            const parcelasBoleto = parseInt(prompt("Digite o número de parcelas desejado para o boleto:"));
            const valorParcelaBoleto = total / parcelasBoleto;
            detalhesPagamento = `- Parcelas: ${parcelasBoleto}x de R$ ${valorParcelaBoleto.toFixed(2)}`;
            break;
        default:
            formaPagamentoTexto = "Desconhecido";
            break;
    }

    // Exibir mensagem com os itens selecionados e o total da compra
    const confirmacaoCompra = confirm(mensagemCompra + `\nTotal da compra: R$ ${total.toFixed(2)}\nForma de pagamento: ${formaPagamentoTexto}\n${detalhesPagamento}\nNome: ${nome}\nE-mail: ${email}\nEndereço: ${endereco}\n\nClique em OK para confirmar a compra ou Cancelar para revisar seus dados.`);

    if (!confirmacaoCompra) {
        return;
    }

    // Salvar informações do usuário
    const usuario = {
        nome: nome,
        email: email,
        endereco: endereco,
        formaPagamento: formaPagamentoTexto,
        detalhesPagamento: detalhesPagamento,
        chavePix: chavePix
    };
    localStorage.setItem('usuario', JSON.stringify(usuario));

    // Limpar o carrinho após a compra
    limparCarrinho();

    // Exibir mensagem de compra finalizada com sucesso
    const confirmacaoFinal = confirm("Compra finalizada com sucesso!");

    if (!confirmacaoFinal) {
        // Caso o usuário cancele, limpar os dados do usuário e reiniciar a compra
        localStorage.removeItem('usuario');
        finalizarCompra();
    }
}

// Função para gerar uma chave PIX aleatória
function generateRandomKey() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 12;
    let key = '';
    for (let i = 0; i < length; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
}
