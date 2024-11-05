// Data do início do relacionamento (substitua por sua data)
const dataInicio = new Date("2024-06-28");

// Atualizar cronômetro
setInterval(() => {
    const agora = new Date();
    const diff = agora - dataInicio;
    const segundos = Math.floor(diff / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const meses = Math.floor(dias / 30);
    const anos = Math.floor(meses / 12);

    // Atualizar cada unidade de tempo na respectiva caixa
    document.getElementById("anos").innerText = anos;
    document.getElementById("meses").innerText = meses % 12;
    document.getElementById("dias").innerText = dias % 30;
    document.getElementById("horas").innerText = horas % 24;
    document.getElementById("minutos").innerText = minutos % 60;
    document.getElementById("segundos").innerText = segundos % 60;

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
