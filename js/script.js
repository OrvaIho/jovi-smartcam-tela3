const passos = document.querySelectorAll(".passo");



const indicadores = document.querySelectorAll(
    ".indicador-passo"
);



const botaoProximo = document.querySelector(
    ".btn-proximo"
);


const botaoAnterior = document.querySelector(
    ".btn-anterior"
);



let passoAtual = 1;




function ativarPasso(numero) {



    if (numero < 1 || numero > passos.length) {

        return;

    }



    passoAtual = numero;



    passos.forEach(function (passo) {

        passo.classList.remove("passo-ativo");

    });



    const passoSelecionado = passos[numero - 1];



    passoSelecionado.classList.add("passo-ativo");





    indicadores.forEach(function (indicador) {

        indicador.classList.remove("progresso-atual");

    });



    indicadores[numero - 1]
        .classList.add("progresso-atual");



    passoSelecionado.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });


    botaoAnterior.disabled = (passoAtual === 1);



    if (passoAtual === passos.length) {

        botaoProximo.textContent = "✓";

    } else {


        botaoProximo.textContent = "●";

    }

}



passos.forEach(function (passo) {


    passo.addEventListener("click", function () {



        const numero = Number(
            this.dataset.passo
        );



        ativarPasso(numero);

    });

});




indicadores.forEach(function (indicador) {



    indicador.addEventListener("click", function () {



        const numero = Number(
            this.dataset.passo
        );



        ativarPasso(numero);

    });

});



const resultado = document.querySelector(
    "#resultado"
);



botaoProximo.addEventListener("click", function () {



    if (passoAtual < passos.length) {

        ativarPasso(passoAtual + 1);

        return;

    }



    resultado.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

    resultado.classList.add("resultado-concluido");


    resultado.classList.add(
    "resultado-concluido"
    );

});




botaoAnterior.addEventListener("click", function () {


    if (resultado.classList.contains("resultado-concluido")) {


        resultado.classList.remove("resultado-concluido");


        ativarPasso(passos.length);

        return;
    }


    if (passoAtual > 1) {

        ativarPasso(passoAtual - 1);

    }

});



ativarPasso(1);


const botaoMicrofone = document.querySelector(
    ".btn-microfone"
);



const chatJovi = document.querySelector(
    "#chatJovi"
);



const botaoFecharChat = document.querySelector(
    ".btn-fechar-chat"
);



botaoMicrofone.addEventListener("click", function () {

    chatJovi.classList.add("chat-aberto");

});

botaoFecharChat.addEventListener("click", function () {

    chatJovi.classList.remove("chat-aberto");

});


const chatMensagens = document.querySelector(
    "#chatMensagens"
);



const chatForm = document.querySelector(
    "#chatForm"
);



const campoMensagem = document.querySelector(
    "#campoMensagem"
);


function adicionarMensagemUsuario(texto) {



    const mensagem = document.createElement("div");



    mensagem.classList.add(
        "mensagem",
        "mensagem-usuario"
    );



    mensagem.textContent = texto;



    chatMensagens.appendChild(mensagem);



    chatMensagens.scrollTop =
        chatMensagens.scrollHeight;

}


function gerarRespostaJovi(texto) {



    const pergunta = texto.toLowerCase();




    if (
        pergunta.includes("night") ||
        pergunta.includes("noturno") ||
        pergunta.includes("noite")
    ) {

        return "Para fotos em ambientes com pouca luz, ative o modo Night Vision antes da captura.";


    }




    if (
        pergunta.includes("firme") ||
        pergunta.includes("estável") ||
        pergunta.includes("tremer") ||
        pergunta.includes("tremendo")
    ) {

        return "Durante a captura, mantenha o celular firme para evitar que a imagem fique tremida.";


    }




    if (
        pergunta.includes("luz") ||
        pergunta.includes("iluminação") ||
        pergunta.includes("iluminacao")
    ) {

        return "Evite apontar a câmera diretamente para fontes de luz intensa. Procure uma área com iluminação mais equilibrada.";


    }




    if (
        pergunta.includes("foto") ||
        pergunta.includes("captura")
    ) {

        return "Para uma captura melhor, use o Night Vision em ambientes escuros, mantenha o celular firme e evite luz direta.";


    }



    return "Posso ajudar com Night Vision, estabilidade do celular, iluminação e dicas para melhorar suas fotos.";
}


chatForm.addEventListener("submit", function (evento) {



    evento.preventDefault();



    const texto = campoMensagem.value.trim();



    if (texto === "") {

        return;

    }



    adicionarMensagemUsuario(texto);



    campoMensagem.value = "";


    const resposta = gerarRespostaJovi(texto);



    setTimeout(function () {



        const mensagem = document.createElement("div");



        mensagem.classList.add(
            "mensagem",
            "mensagem-jovi"
        );



        const remetente = document.createElement(
            "span"
        );

        remetente.classList.add(
            "mensagem-remetente"
        );

        remetente.textContent = "JOVI";



        const textoResposta = document.createElement(
            "p"
        );

        textoResposta.textContent = resposta;



        mensagem.appendChild(remetente);

        mensagem.appendChild(textoResposta);



        chatMensagens.appendChild(mensagem);



        chatMensagens.scrollTop =
            chatMensagens.scrollHeight;


    }, 700);

});