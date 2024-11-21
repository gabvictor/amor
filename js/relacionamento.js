// Data do início do relacionamento (substitua por sua data)
const dataInicio = new Date("2024-06-28T00:00:00-05:00");  // Definindo a data no horário do Acre

// Função para obter a data atual ajustada para o fuso horário do Acre
function getDataHoraAcre() {
    const agora = new Date();
    return new Date(agora.toLocaleString("en-US", { timeZone: "America/Rio_Branco" }));
}

// Atualizar cronômetro
setInterval(() => {
    const agora = getDataHoraAcre();  // Agora usando o horário do Acre

    // Diferença total em milissegundos
    let diff = agora - dataInicio;

    // Calcular anos, meses, dias, horas, minutos e segundos
    let anos = agora.getFullYear() - dataInicio.getFullYear();
    let meses = agora.getMonth() - dataInicio.getMonth();
    let dias = agora.getDate() - dataInicio.getDate();
    let horas = agora.getHours() - dataInicio.getHours();
    let minutos = agora.getMinutes() - dataInicio.getMinutes();
    let segundos = agora.getSeconds() - dataInicio.getSeconds();

    // Ajustar unidades negativas
    if (segundos < 0) {
        segundos += 60;
        minutos -= 1;
    }
    if (minutos < 0) {
        minutos += 60;
        horas -= 1;
    }
    if (horas < 0) {
        horas += 24;
        dias -= 1;
    }
    if (dias < 0) {
        const ultimoMes = new Date(agora.getFullYear(), agora.getMonth(), 0); // Último dia do mês anterior
        dias += ultimoMes.getDate();
        meses -= 1;
    }
    if (meses < 0) {
        meses += 12;
        anos -= 1;
    }

    // Atualizar cada unidade de tempo na respectiva caixa
    document.getElementById("anos").innerText = anos;
    document.getElementById("meses").innerText = meses;
    document.getElementById("dias").innerText = dias;
    document.getElementById("horas").innerText = horas;
    document.getElementById("minutos").innerText = minutos;
    document.getElementById("segundos").innerText = segundos;

    // Verificar se anos é zero e esconder ou mostrar a caixa de anos
    const anosBox = document.getElementById("anos-box");
    if (anos === 0) {
        anosBox.style.display = "none"; // Oculta a caixa de anos
    } else {
        anosBox.style.display = "flex"; // Mostra a caixa de anos
    }
}, 1000);

// Limite máximo de elementos animados na tela
const maxElementos = 200;

// Função para verificar e contar os elementos "falling" na tela
function contarElementosAtuais() {
    return document.querySelectorAll('.falling').length;
}

// Animação de corações e flores caindo
function criarElementoFalling() {
    // Verifica se o número de elementos na tela ultrapassou o limite
    if (contarElementosAtuais() >= maxElementos) return;

    const simbolos = ["❤️", "🌸", "💖", "🌹"];
    const elemento = document.createElement("div");
    elemento.innerText = simbolos[Math.floor(Math.random() * simbolos.length)];
    elemento.classList.add("falling");
    elemento.style.left = Math.random() * 100 + "vw";

    // Definindo a duração da animação e a rotação
    const duracaoAnimacao = Math.random() * 3 + 4; // Duração entre 4 e 7 segundos
    const rotacaoAleatoria = Math.random() * 360; // Rotação aleatória de 0 a 360 graus

    // Aplicando as propriedades
    elemento.style.animationDuration = duracaoAnimacao + "s";
    elemento.style.transform = `rotate(${rotacaoAleatoria}deg)`; // Define a rotação inicial
    document.body.appendChild(elemento);

    // Remover o elemento após a duração da animação
    elemento.addEventListener("animationend", () => {
        elemento.remove();
    });

    // Remover o elemento após um tempo limite (caso a animação falhe)
    setTimeout(() => {
        if (document.body.contains(elemento)) {
            elemento.remove();
        }
    }, duracaoAnimacao * 1000 + 500); // Duracao de animação + 0.5s de segurança
}

// Intervalo ajustado para criar novos emojis
setInterval(criarElementoFalling, 700);
