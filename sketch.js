let estado = "menu";
let estadoAnterior = "menu";
let botaoComecar, botaoQuiz, botaoSobre, botaoVoltar, botaoAvancar;
let img;
let perguntas;
let perguntaAtual = 0;
let respostasCorretas = 0;
let respostaSelecionada = false;
let botoes = [];
let deslocamentoY = 0;
let alturaTotal = 1100; // reduzido

function preload() {
  img = loadImage('img/imagem1.jpg');
}

function setup() {
  createCanvas(600, 400);

  botaoComecar = createButton("Começar");
  botaoComecar.position(265, 100);
  botaoComecar.mousePressed(() => mudarEstado("jogo"));

  botaoQuiz = createButton("Quizizz");
  botaoQuiz.position(269, 150);
  botaoQuiz.mousePressed(() => mudarEstado("quiz"));

  botaoSobre = createButton("Sobre o Desenvolvedor");
  botaoSobre.position(230, 200);
  botaoSobre.mousePressed(() => mudarEstado("sobre"));

  botaoVoltar = createButton("Voltar");
  botaoVoltar.position(10, 10);
  botaoVoltar.mousePressed(() => voltar());
  botaoVoltar.hide();

  botaoAvancar = createButton("Avançar");
  botaoAvancar.position(500, 360);
  botaoAvancar.mousePressed(() => {
    if (estado === "jogo") mudarEstado("fase2");
    else if (estado === "fase2") mudarEstado("campoCidade");
  });
  botaoAvancar.hide();

  perguntas = [/* suas perguntas aqui */];
}

function draw() {
  background(220);
  if (estado === "menu") mostrarMenu();
  else if (estado === "jogo") mostrarJogo();
  else if (estado === "quiz") mostrarQuiz();
  else if (estado === "sobre") mostrarSobre();
  else if (estado === "fase2") mostrarFase2();
  else if (estado === "campoCidade") mostrarCampoCidade();
  else if (estado === "resultado") mostrarResultado();
}

function mostrarMenu() {
  mostrarOuEsconderBotoesMenu(true);
  botaoVoltar.hide();
  botaoAvancar.hide();
  removerBotoes();
  imageMode(CENTER);
  image(img, width / 2, height / 2);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("CAMPO E CIDADE", width / 2, 40);
}

function mostrarJogo() {
  mostrarOuEsconderBotoesMenu(false);
  botaoVoltar.show();
  botaoAvancar.hide();
  removerBotoes();

  push();
  translate(0, -deslocamentoY);

  fill(220);
  rect(0, 0, width, alturaTotal);

  textAlign(CENTER, TOP);
  textSize(36);
  fill(0);
  text("CAMPO E CIDADE", width / 2, 20);

  textAlign(LEFT, TOP);
  textSize(22);
  text("🌾 O CAMPO", 30, 80);

  textSize(16);
  textWrap(WORD);
  fill(0);
  let textoCampo = "O campo é uma vasta área rural onde predominam atividades agrícolas e agropecuárias. É nesse ambiente que se produz a maior parte dos alimentos consumidos pela população. O espaço rural é caracterizado por paisagens naturais, menor densidade populacional e maior presença de áreas verdes. As pessoas que vivem no campo costumam ter rotinas ligadas à natureza, e o estilo de vida é geralmente mais calmo e com menor poluição sonora e ambiental.\n\nNo entanto, o campo também enfrenta desafios, como o êxodo rural, que é o abandono dessa área por jovens que buscam oportunidades nas cidades. A mecanização da agricultura e a falta de acesso a serviços públicos de qualidade, como saúde e educação, também são questões importantes. Ainda assim, o campo tem papel fundamental na economia e na cultura do país, sendo uma fonte rica de tradições e saberes populares.";

  text(textoCampo, 30, 110, width - 60);

  // Menor espaçamento
  let yCidade = 110 + 320 + 20;

  textSize(22);
  text("🏙️ A CIDADE", 30, yCidade);

  textSize(16);
  let textoCidade = "A cidade é caracterizada por uma alta densidade populacional, infraestrutura urbana desenvolvida e intensa atividade econômica e cultural. Nela, encontramos prédios, ruas asfaltadas, comércios, escolas, hospitais e uma variedade de serviços. A cidade atrai muitas pessoas pela oferta de empregos, acesso à informação, lazer e melhores condições de vida.\n\nPor outro lado, os centros urbanos também enfrentam desafios como o trânsito, a poluição, a violência e a desigualdade social. Muitas vezes, a urbanização cresce de forma desordenada, gerando problemas como favelas e falta de saneamento básico. Apesar disso, a cidade é um espaço dinâmico e essencial para o desenvolvimento do país, pois concentra grande parte da produção industrial, científica e tecnológica.";

  text(textoCidade, 30, yCidade + 30, width - 60);

  pop();

  textSize(14);
  textAlign(CENTER);
  fill(50);
  text("Use a roda do mouse ou ↑ ↓ para rolar", width / 2, height - 20);
}

function mouseWheel(event) {
  if (estado === "jogo") {
    deslocamentoY += event.delta;
    deslocamentoY = constrain(deslocamentoY, 0, alturaTotal - height);
  }
}

function keyPressed() {
  if (estado === "jogo") {
    if (keyCode === UP_ARROW) deslocamentoY -= 40;
    if (keyCode === DOWN_ARROW) deslocamentoY += 40;
    deslocamentoY = constrain(deslocamentoY, 0, alturaTotal - height);
  }
}

function mostrarFase2() {
  mostrarOuEsconderBotoesMenu(false);
  botaoVoltar.show();
  botaoAvancar.show();
  textAlign(CENTER, CENTER);
  textSize(36);
  text("CIDADE", width / 2, 40);

  textAlign(LEFT, TOP);
  textSize(18);
  textWrap(WORD);
  fill(0);
  text("A cidade é caracterizada por uma alta densidade populacional...", 30, 80, width - 60);
}

function mostrarCampoCidade() {
  mostrarOuEsconderBotoesMenu(false);
  botaoVoltar.show();
  botaoAvancar.hide();

  textAlign(CENTER, CENTER);
  textSize(32);
  text("Campo e Cidade: Uma Troca Essencial", width / 2, 40);

  textAlign(LEFT, TOP);
  textSize(16);
  textWrap(WORD);
  fill(0);
  text("O campo e a cidade mantêm uma relação de interdependência essencial para o funcionamento equilibrado da sociedade. [...]",
    30, 80, width - 60
  );
}

function mostrarQuiz() {
  mostrarOuEsconderBotoesMenu(false);
  botaoVoltar.show();
  botaoAvancar.hide();
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Pergunta " + (perguntaAtual + 1), width / 2, 40);
  textAlign(LEFT, TOP);
  textSize(18);
  text(perguntas[perguntaAtual].pergunta, 30, 80, width - 60);
  removerBotoes();
  for (let i = 0; i < 3; i++) {
    let yPos = 140 + i * 40;
    let corFundo = color(255);
    if (respostaSelecionada !== false) {
      if (i === perguntas[perguntaAtual].respostaCorreta) corFundo = color(0, 255, 0);
      else if (i === respostaSelecionada) corFundo = color(255, 0, 0);
    }
    let botao = createButton(perguntas[perguntaAtual].opcoes[i]);
    botao.position(30, yPos);
    botao.style('background-color', corFundo);
    botao.mousePressed(() => verificarResposta(i));
    botoes.push(botao);
  }
}

function verificarResposta(indiceResposta) {
  respostaSelecionada = indiceResposta;
  if (indiceResposta === perguntas[perguntaAtual].respostaCorreta) respostasCorretas++;
  setTimeout(() => {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
      respostaSelecionada = false;
      mudarEstado("quiz");
    } else {
      mudarEstado("resultado");
    }
  }, 1000);
}

function removerBotoes() {
  for (let i = 0; i < botoes.length; i++) botoes[i].remove();
  botoes = [];
}

function mostrarResultado() {
  let porcentagem = (respostasCorretas / perguntas.length) * 100;
  clear();
  textAlign(CENTER, CENTER);
  textSize(24);
  text("Você acertou " + respostasCorretas + " de " + perguntas.length + " perguntas!", width / 2, height / 3);
  text("Sua pontuação: " + porcentagem.toFixed(2) + "%", width / 2, height / 2);
  botaoVoltar.show();
  botaoAvancar.hide();
}

function mostrarSobre() {
  mostrarOuEsconderBotoesMenu(false);
  botaoVoltar.show();
  botaoAvancar.hide();
  textAlign(CENTER, CENTER);
  textSize(36);
  text("Desenvolvedor: Wesley Kauan", width / 2, height / 10);
  textSize(20);
  text("No início eu tive muita dificuldade, mas fui evoluindo com a prática.", width / 2, height / 2);
}

function mudarEstado(novoEstado) {
  estadoAnterior = estado;
  estado = novoEstado;
}

function mostrarOuEsconderBotoesMenu(mostrar) {
  if (mostrar) {
    botaoComecar.show();
    botaoQuiz.show();
    botaoSobre.show();
  } else {
    botaoComecar.hide();
    botaoQuiz.hide();
    botaoSobre.hide();
  }
}

function voltar() {
  if (estado === "campoCidade") mudarEstado("fase2");
  else if (estado === "fase2") mudarEstado("jogo");
  else if (estado === "jogo") mudarEstado("menu");
  else if (estado === "quiz") {
    mudarEstado("menu");
    perguntaAtual = 0;
    respostasCorretas = 0;
    respostaSelecionada = false;
  } else if (estado === "sobre") mudarEstado("menu");
  else if (estado === "resultado") {
    perguntaAtual = perguntas.length - 1;
    respostasCorretas--;
    respostaSelecionada = false;
    mudarEstado("quiz");
  } else mudarEstado("menu");
}
