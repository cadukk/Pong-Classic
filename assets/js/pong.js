//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variaveis da raquete
let xRaqueteP1 = 5;
let yRaqueteP1 = 150;
let xRaqueteP2 = 585;
let yRaqueteP2 = 150;
let velocidadeYP2 = 0;

let wRaquete = 10;
let hRaquete = 90;

let colidiu = false;

let chanceDeErrar = 0;

//placar do jogo
let pontosP1 = 0;
let pontosP2 = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaqueteP1, yRaqueteP1);
  movimentaRaqueteP1();
  //verificaColisaoRaqueteP1();
  verificaColisaoRaquete(xRaqueteP1, yRaqueteP1)
  mostraRaquete(xRaqueteP2, yRaqueteP2);
  movimentaRaqueteP2();
  verificaColisaoRaquete(xRaqueteP2, yRaqueteP2);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width ||
    xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height ||
    yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, wRaquete, hRaquete);
}

function movimentaRaqueteP1() {
  if (keyIsDown(UP_ARROW)) {
    yRaqueteP1 -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaqueteP1 += 10;
  }
}

function calculaChanceDeErrar() {
  if (pontosP1 >= pontosP2) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39) {
      chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35) {
      chanceDeErrar = 35
    }
  }
}

function movimentaRaqueteP2() {
  velocidadeYP2 = yBolinha - yRaqueteP2 - wRaquete / 2 - 30;
  yRaqueteP2 += velocidadeYP2 + chanceDeErrar;
  calculaChanceDeErrar();
}

function verificaColisaoRaqueteP1() {
  if (xBolinha - raio < xRaqueteP1 + wRaquete && yBolinha - raio < yRaqueteP1 + hRaquete && yBolinha + raio > yRaqueteP1) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, wRaquete, hRaquete, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(pontosP1, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosP2, 470, 26);
}

function marcaPonto() {
  if (xBolinha > 590) {
    pontosP1 += 1;
    ponto.play();
  }
  if (xBolinha < 10) {
    pontosP2 += 1;
    ponto.play();
  }
}