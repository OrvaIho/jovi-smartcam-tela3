/* =========================================================
   MINI TUTORIAL - JOVI SMARTCAM
   Navegação do tutorial + chat da Jovi
   ========================================================= */

const passos = document.querySelectorAll(".passo");
const indicadores = document.querySelectorAll(".indicador-passo");
const botaoProximo = document.querySelector(".btn-proximo");
const botaoAnterior = document.querySelector(".btn-anterior");
let passoAtual = 1;

/* ---------------------------------------------------------
   NAVEGAÇÃO DO TUTORIAL
   --------------------------------------------------------- */
function ativarPasso(numero) {
    if (numero < 1 || numero > passos.length) return;

    passoAtual = numero;

    passos.forEach(function (passo) {
        passo.classList.remove("passo-ativo");
    });

    const passoSelecionado = passos[numero - 1];
    passoSelecionado.classList.add("passo-ativo");

    indicadores.forEach(function (indicador) {
        indicador.classList.remove("progresso-atual");
    });

    indicadores[numero - 1].classList.add("progresso-atual");

    passoSelecionado.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    botaoAnterior.disabled = (passoAtual === 1);
    botaoProximo.textContent = passoAtual === passos.length ? "✓" : "●";
}

passos.forEach(function (passo) {
    passo.addEventListener("click", function () {
        ativarPasso(Number(this.dataset.passo));
    });
});

indicadores.forEach(function (indicador) {
    indicador.addEventListener("click", function () {
        ativarPasso(Number(this.dataset.passo));
    });
});

const resultado = document.querySelector("#resultado");

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

/* ---------------------------------------------------------
   CHAT DA JOVI, DIRETO NA ÁREA "AINDA PRECISA DE AJUDA?"
   --------------------------------------------------------- */
const chatJovi = document.querySelector("#chatJovi");
const chatMensagens = document.querySelector("#chatMensagens");
const chatForm = document.querySelector("#chatForm");
const campoMensagem = document.querySelector("#campoMensagem");


function adicionarMensagemUsuario(texto) {
    const mensagem = document.createElement("div");
    mensagem.classList.add("mensagem", "mensagem-usuario");
    mensagem.textContent = texto;
    chatMensagens.appendChild(mensagem);
    chatMensagens.scrollTop = chatMensagens.scrollHeight;
}

function adicionarMensagemJovi(texto) {
    const mensagem = document.createElement("div");
    mensagem.classList.add("mensagem", "mensagem-jovi");

    const remetente = document.createElement("span");
    remetente.classList.add("mensagem-remetente");
    remetente.textContent = "JOVI";

    const textoResposta = document.createElement("p");
    textoResposta.textContent = texto;

    mensagem.appendChild(remetente);
    mensagem.appendChild(textoResposta);
    chatMensagens.appendChild(mensagem);
    chatMensagens.scrollTop = chatMensagens.scrollHeight;
}

function gerarRespostaJovi(texto) {
    const pergunta = texto.toLowerCase();

    if (pergunta.includes("night") || pergunta.includes("noturno") || pergunta.includes("noite")) {
        return "Para fotos em ambientes com pouca luz, ative o modo Night Vision antes da captura.";
    }

    if (pergunta.includes("firme") || pergunta.includes("estável") || pergunta.includes("tremer") || pergunta.includes("tremendo")) {
        return "Durante a captura, mantenha o celular firme para evitar que a imagem fique tremida.";
    }

    if (pergunta.includes("luz") || pergunta.includes("iluminação") || pergunta.includes("iluminacao")) {
        return "Evite apontar a câmera diretamente para fontes de luz intensa. Procure uma área com iluminação mais equilibrada.";
    }

    if (pergunta.includes("foto") || pergunta.includes("captura")) {
        return "Para uma captura melhor, use o Night Vision em ambientes escuros, mantenha o celular firme e evite luz direta.";
    }

    return "Posso ajudar com Night Vision, estabilidade do celular, iluminação e dicas para melhorar suas fotos.";
}


function responderDepoisDeUmTempo(resposta) {
    setTimeout(function () {
        adicionarMensagemJovi(resposta);
    }, 700);
}

chatForm.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const texto = campoMensagem.value.trim();
    if (texto === "") return;

    adicionarMensagemUsuario(texto);
    campoMensagem.value = "";
    responderDepoisDeUmTempo(gerarRespostaJovi(texto));
});

/* ---------------------------------------------------------
   1. ADICIONAR IMAGENS
   --------------------------------------------------------- */
const arquivoImagem = document.querySelector("#arquivoImagem");

arquivoImagem.addEventListener("change", function () {
    const arquivos = Array.from(this.files);

    arquivos.forEach(function (arquivo) {

        const mensagem = document.createElement("div");
        mensagem.classList.add("mensagem", "mensagem-usuario", "mensagem-imagem");

        const imagem = document.createElement("img");
        imagem.src = URL.createObjectURL(arquivo);
        imagem.alt = "Imagem enviada: " + arquivo.name;

        const nome = document.createElement("small");
        nome.textContent = arquivo.name;

        mensagem.appendChild(imagem);
        mensagem.appendChild(nome);
        chatMensagens.appendChild(mensagem);

        responderDepoisDeUmTempo("Recebi sua imagem. Posso ajudar a analisar a dúvida relacionada à captura.");
    });

    chatMensagens.scrollTop = chatMensagens.scrollHeight;
    this.value = "";
});

/* ---------------------------------------------------------
   2. COLAR LINK
   --------------------------------------------------------- */
const btnColarLink = document.querySelector("#btnColarLink");
const linkChat = document.querySelector("#linkChat");
const campoLink = document.querySelector("#campoLink");
const btnEnviarLink = document.querySelector("#btnEnviarLink");
const chatAcoes = document.querySelector(".chat-acoes");
const botaoEnviarMensagem = document.querySelector(".ajuda-enviar");

btnColarLink.addEventListener("click", async function () {
    linkChat.hidden = !linkChat.hidden;


    chatAcoes.hidden = !linkChat.hidden;
    botaoEnviarMensagem.hidden = !linkChat.hidden;

    if (!linkChat.hidden) {
        campoLink.focus();


        try {
            const texto = await navigator.clipboard.readText();
            if (texto && /^https?:\/\//i.test(texto)) {
                campoLink.value = texto;
            }
        } catch (erro) {

        }
    }
});

function enviarLink() {
    const link = campoLink.value.trim();

    if (!link) return;

    try {
        const url = new URL(link);
        if (!/^https?:$/.test(url.protocol)) throw new Error("Protocolo inválido");

        const mensagem = document.createElement("div");
        mensagem.classList.add("mensagem", "mensagem-usuario", "mensagem-link");

        const ancora = document.createElement("a");
        ancora.href = url.href;
        ancora.target = "_blank";
        ancora.rel = "noopener noreferrer";
        ancora.textContent = url.href;

        mensagem.appendChild(ancora);
        chatMensagens.appendChild(mensagem);
        chatMensagens.scrollTop = chatMensagens.scrollHeight;

        campoLink.value = "";
        linkChat.hidden = true;
        chatAcoes.hidden = false;
        botaoEnviarMensagem.hidden = false;
        responderDepoisDeUmTempo("Recebi o link. Agora me diga qual é a sua dúvida sobre ele.");
    } catch (erro) {
        campoLink.focus();
        campoLink.setCustomValidity("Digite um link válido começando com http:// ou https://");
        campoLink.reportValidity();
        campoLink.setCustomValidity("");
    }
}

btnEnviarLink.addEventListener("click", enviarLink);
campoLink.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
        evento.preventDefault();
        enviarLink();
    }
});

/* ---------------------------------------------------------
   3. GRAVAR E ENVIAR ÁUDIO
   --------------------------------------------------------- */
const botaoMicrofone = document.querySelector(".btn-microfone");
const audioChat = document.querySelector("#audioChat");
const statusAudio = document.querySelector("#statusAudio");
const btnPararAudio = document.querySelector("#btnPararAudio");

let gravadorAudio = null;
let partesAudio = [];
let streamAudio = null;

botaoMicrofone.addEventListener("click", async function () {
    /* Se já estiver gravando, o clique encerra e envia o áudio. */
    if (gravadorAudio && gravadorAudio.state === "recording") {
        gravadorAudio.stop();
        return;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) {
        adicionarMensagemJovi("Seu navegador não oferece gravação de áudio neste dispositivo. Você ainda pode digitar sua dúvida.");
        return;
    }

    try {
        streamAudio = await navigator.mediaDevices.getUserMedia({ audio: true });
        partesAudio = [];
        gravadorAudio = new MediaRecorder(streamAudio);

        gravadorAudio.addEventListener("dataavailable", function (evento) {
            if (evento.data.size > 0) partesAudio.push(evento.data);
        });

        gravadorAudio.addEventListener("stop", function () {
            const blobAudio = new Blob(partesAudio, { type: gravadorAudio.mimeType || "audio/webm" });
            const urlAudio = URL.createObjectURL(blobAudio);

            const mensagem = document.createElement("div");
            mensagem.classList.add("mensagem", "mensagem-usuario", "mensagem-audio");

            const audio = document.createElement("audio");
            audio.controls = true;
            audio.src = urlAudio;
            audio.setAttribute("aria-label", "Áudio enviado");

            mensagem.appendChild(audio);
            chatMensagens.appendChild(mensagem);
            chatMensagens.scrollTop = chatMensagens.scrollHeight;

            responderDepoisDeUmTempo("Recebi seu áudio. Você pode continuar a conversa comigo por aqui.");

            if (streamAudio) {
                streamAudio.getTracks().forEach(function (track) {
                    track.stop();
                });
            }

            audioChat.hidden = true;
            botaoMicrofone.classList.remove("gravando");
            botaoMicrofone.textContent = "♩";
            gravadorAudio = null;
            streamAudio = null;
        });

        gravadorAudio.start();
        audioChat.hidden = false;
        statusAudio.textContent = "Gravando... toque novamente no microfone para enviar";
        botaoMicrofone.classList.add("gravando");
        botaoMicrofone.textContent = "■";
    } catch (erro) {
        adicionarMensagemJovi("Não consegui acessar o microfone. Verifique a permissão do navegador e tente novamente.");
    }
});

btnPararAudio.addEventListener("click", function () {
    if (gravadorAudio && gravadorAudio.state === "recording") {
        gravadorAudio.stop();
    }
});
