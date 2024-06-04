
// Recuperar informações do usuário do localStorage
const usuario = JSON.parse(localStorage.getItem('usuario'));
document.getElementById('nomeUsuario').textContent = usuario.nome;
document.getElementById('emailUsuario').textContent = usuario.email;
document.getElementById('enderecoUsuario').textContent = usuario.endereco;

// Recuperar informações da compra do localStorage
const totalCompra = JSON.parse(localStorage.getItem('totalCompra'));
const formaPagamento = usuario.formaPagamento;
const numParcelas = localStorage.getItem('numParcelas') || 'À vista';
document.getElementById('totalCompra').textContent = totalCompra;
document.getElementById('formaPagamento').textContent = formaPagamento;
document.getElementById('parcelas').textContent = numParcelas;
document.addEventListener('DOMContentLoaded', function() {
    // Recuperar informações do usuário do localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const totalCompra = JSON.parse(localStorage.getItem('totalCompra'));
    const formaPagamento = usuario.formaPagamento;
    
    // Preencher informações do usuário no comprovante
    document.getElementById('nomeUsuario').textContent = usuario.nome;
    document.getElementById('emailUsuario').textContent = usuario.email;
    document.getElementById('enderecoUsuario').textContent = usuario.endereco;

    // Preencher detalhes da compra no comprovante
    document.getElementById('totalCompra').textContent = totalCompra.toFixed(2);
    document.getElementById('formaPagamento').textContent = formaPagamento;

    // Verificar se a forma de pagamento permite parcelamento
    if (formaPagamento === 'credito' || formaPagamento === 'boleto') {
        // Recuperar e exibir o número de parcelas
        const numParcelas = localStorage.getItem('numParcelas');
        document.getElementById('parcelas').textContent = numParcelas;
    } else {
        // Ocultar a seção de parcelas se a forma de pagamento não for crédito ou boleto
        document.getElementById('parcelas').style.display = 'none';
    }
});

    // Função para verificar o método de pagamento selecionado e mostrar ou ocultar parcelas
    function verificarPagamento() {
        var formaPagamento = document.querySelector('input[name="pagamento"]:checked').value;
        var parcelas = document.getElementById('parcelas');

        if (formaPagamento === 'credito' || formaPagamento === 'boleto') {
            parcelas.style.display = 'none';
        } else {
            parcelas.style.display = 'block';
        }
    }

    window.onload = function() {
        // Chama a função quando a página é carregada para verificar o estado inicial do pagamento
        verificarPagamento();

        // Adiciona um evento para monitorar mudanças na opção de pagamento
        var formasPagamento = document.querySelectorAll('input[name="pagamento"]');
        formasPagamento.forEach(function(opcao) {
            opcao.addEventListener('change', verificarPagamento);
        });
    };

    // Função para confirmar a compra
    function confirmarCompra() {
        // Obtenha os dados do usuário e da compra
        var nome = document.getElementById('nome').value;
        var sobrenome = document.getElementById('sobrenome').value;
        var email = document.getElementById('email').value;
        var endereco = document.getElementById('endereco').value;
        var total = document.getElementById('total').textContent;
        var formaPagamento = document.querySelector('input[name="pagamento"]:checked').value;
        var parcelas = document.getElementById('numParcelas').value;

        // Redireciona para o comprovante de compra com os parâmetros de consulta
        window.location.href = 'comprovante.html?nome=' + encodeURIComponent(nome) + '&sobrenome=' + encodeURIComponent(sobrenome) + '&email=' + encodeURIComponent(email) + '&endereco=' + encodeURIComponent(endereco) + '&total=' + encodeURIComponent(total) + '&formaPagamento=' + encodeURIComponent(formaPagamento) + '&parcelas=' + encodeURIComponent(parcelas);
    }


