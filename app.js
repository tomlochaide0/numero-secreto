let listaDeNumerosSorteados = []; // Lista para armazenar os números já sorteados
let numeroLimite = 5; // Limite máximo para o número sorteado (1 até 5)
let numeroSecreto = gerarNumeroAleatorio(); // Gera o primeiro número secreto aleatório
let tentativas = 1; // Contador de tentativas feitas pelo jogador

// Função para exibir texto na tela e também falar o texto em voz alta
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag); // Seleciona o campo HTML pela tag (ex: 'h1', 'p')
    campo.innerHTML = texto; // Exibe o texto no campo HTML
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // Fala o texto em português com a voz feminina
}

// Função que exibe a mensagem inicial ao iniciar o jogo
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto'); // Exibe o título do jogo
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 5'); // Exibe as instruções
}

exibirMensagemInicial(); // Chama a função para exibir a mensagem inicial

// Função para verificar o chute do jogador
function verificarChute() {
    let chute = document.querySelector('input').value; // Obtém o valor inserido pelo jogador no campo de input
    
    if (chute == numeroSecreto) { // Verifica se o chute é o número secreto
        exibirTextoNaTela('h1', 'Acertou!'); // Exibe "Acertou!" no título
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // Pluraliza a palavra "tentativa" se necessário
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`; // Mensagem de sucesso
        exibirTextoNaTela('p', mensagemTentativas); // Exibe a mensagem de sucesso
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão de reinício
    } else { // Se o chute estiver errado
        if (chute > numeroSecreto) { // Se o chute for maior que o número secreto
            exibirTextoNaTela('p', 'O número secreto é menor'); // Informa ao jogador que o número é menor
        } else { // Se o chute for menor que o número secreto
            exibirTextoNaTela('p', 'O número secreto é maior'); // Informa ao jogador que o número é maior
        }
        tentativas++; // Incrementa o contador de tentativas
        limparCampo(); // Limpa o campo de input para o próximo chute
    }
}

// Função para gerar um número aleatório entre 1 e numeroLimite (neste caso, 10)
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); // Gera um número aleatório entre 1 e 10
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; // Verifica quantos números já foram sorteados

    if (quantidadeDeElementosNaLista == numeroLimite) { // Se já sorteou todos os números possíveis
        listaDeNumerosSorteados = []; // Limpa a lista de números sorteados
    }

    // Verifica se o número sorteado já foi gerado antes
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio(); // Se já foi sorteado, chama a função recursivamente até obter um número único
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); // Adiciona o número sorteado à lista
        console.log(listaDeNumerosSorteados); // Exibe a lista de números sorteados no console para depuração
        return numeroEscolhido; // Retorna o número sorteado
    }
}

// Função para limpar o campo de input
function limparCampo() {
    chute = document.querySelector('input'); // Seleciona o campo de input
    chute.value = ''; // Limpa o valor do campo
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio(); // Gera um novo número secreto
    limparCampo(); // Limpa o campo de input
    tentativas = 1; // Reinicia o contador de tentativas
    exibirMensagemInicial(); // Exibe a mensagem inicial novamente
    document.getElementById('reiniciar').setAttribute('disabled', true) // Desabilita o botão de reinício até o próximo jogo
}






