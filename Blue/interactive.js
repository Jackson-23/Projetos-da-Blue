// Definindo o Prompt
const prompt = require('prompt-sync')();
console.clear();

//Declaração de variáveis da história
let treino = 0;
let investigacao = 0;//para marcar progresso de investigação.
let usodiario = false;
let six = "$$$"
//lista para armezanar tabela de status à ser inserido ao objeto personagem dependendo da classe escolhida
let statusinicial = [["Guerreiro", 8, 4, 60, 1, 1, "Espada"],
["Ninja", 4, 2, 100, 1, 60, "Katana"],
["Arqueiro", 8, 1, 100, 60, 1, "Arco"]]

//Objeto Personagem para guardar e alterar dados e status do Personagem.
const personagem = {
  nome: "vazio",
  classe: "vazio",
  pv: 10,//pontos de vida
  pvpadrao: 10,
  ataque: 0,
  ataquepadrao: 0,
  defesa: 0,
  taxadeacerto: 0,
  taxadeesquiva: 0,
  taxadecritico: 0,
  concentracao: false,
  bolsa: {
    erva_vermelha: 3,//Restaura Vida
    chifre_de_cervo: 0,
    moedas: 25,
    arma: "",
    armapadrao: "",
  },
  //Método para alterar status do personagem de acordo com a classe escolhida. 
  class_select: function (classe, atk, def, txacc, txesq, txcrt, equip) {
    this.classe = classe;
    this.ataque = atk;
    this.ataquepadrao = atk;
    this.defesa = def;
    this.taxadeacerto = txacc;
    this.taxadeesquiva = txesq;
    this.taxadecritico = txcrt;
    this.bolsa.arma = equip;
    this.bolsa.armapadrao = equip;
  },

  //Método para calcular dano
  ataquecalc: function calc(bonusatk = false) {
    if (rng(100) > this.taxadeacerto && bonusatk == false) {
      console.log("Você errou o ataque!");
      return 0;
    }
    if (rng(100) <= this.taxadecritico || bonusatk == true) {
      console.log("Você acertou um ataque crítico!");
      return this.ataque * 2;
    }

    return this.ataque;
  },

  //Método para receber dano
  receber_dano: function subtrairdano(atk) {
    if (rng(100) <= this.taxadeesquiva) {
      console.log("Você consegue se esquivar do ataque!")
      return 0;
    }
    this.pv -= (atk / this.defesa);
    return (atk / this.defesa);
  },
  //Método para restaurar pv
  curar: function curar() {
    this.pv = this.pvpadrao;
    this.bolsa.erva_vermelha--;
  }

}

//Construtor de objetos inimigo
function inimigo(nome, pv, ataque) {
  this.nome = nome,
    this.pv = pv,
    this.pvpadrao = pv,
    this.ataque = ataque,
    this.taxadecritico = 1,
    this.alucinado = false,
    //método para aplicar dano na vida(pv)
    this.receber_dano = function subtrairdano(atk) {
      this.pv -= atk;
    },
    //método para aplicar o efeito (Alucinar) que altera os status do inimigo
    this.alucinar = function alucinar() {
      if (rng(100) <= (15 + (tempo.dia * 5))) {
        this.ataque *= 2;
        if (this.nome == "Leão Rei")
          this.pv = 100;
        if (this.nome == "Dragão")
          this.pv = 200;
        this.nome += " Alucinado";
        this.alucinado = true;
      }
    },

    this.resetpv = function resetpv() {
      this.pv = this.pvpadrao;
      if (this.alucinado == true) {
        this.desalucinar();
        this.alucinado = false;
      }
    },

    this.desalucinar = function desalucinar() {
      this.ataque /= 2;
      this.nome = this.nome.slice(0, -10);
    },

    this.ataquecritico = function critico() {
      let atk = this.ataque * 2;
      return atk;
    }

}

//Declaração de objetos inimigos
let cervo = new inimigo("Cervo", 10, 4);
let bandido = new inimigo("Bandido", 20, 4);
let lobo = new inimigo("Lobo", 35, 8);
let urso = new inimigo("Urso Pardo", 50, 8);
let leao = new inimigo("Leão Rei", 70, 16);
let dragao = new inimigo("Dragão", 100, 16);

//Lista com inimigos inseridos
let lista_enemy = [];
lista_enemy.push(cervo);
lista_enemy.push(bandido);
lista_enemy.push(lobo);
lista_enemy.push(urso);
lista_enemy.push(leao);
lista_enemy.push(dragao);


const tempo = {
  dia: 1,
  hora: 6,
  minuto: 47,
  horastring: "06",
  minutostring: "47",

  cronos: function (mins) {
    let horaconvert = mins / 60;
    let minutorest = mins % 60;
    this.hora += Math.floor(horaconvert);
    this.minuto += minutorest;
    if (this.minuto >= 60) {
      this.minuto -= 60;
      this.hora++;
    }
    if (this.hora >= 24) {
      this.hora -= 24;
      this.dia++;
      //nivel_de_alucinacao += 5;
    }
    this.horastring = this.hora.toString();
    this.minutostring = this.minuto.toString();
    if (this.hora <= 9) {
      this.horastring = "0" + this.horastring;
    }
    if (this.minuto <= 9) {
      this.minutostring = "0" + this.minutostring;
    }

  },
  exibir: function () {
    let result = this.horastring + ":" + this.minutostring + "h" + " - " + "Dia: " + this.dia;
    return result;
  }
}



//DECLACARÇÃO DE FUÇÕES*************************
//Função exibição de dados
function exibicao_de_dados() {
  console.clear();
  console.log("\t\t\t\t\t\t\t" + cor(tempo.exibir(), "ciano"));
  console.log("-" + cor(personagem.nome, "ciano italico") + "-")
  console.log(" Vida: " + cor(personagem.pv, "verde") + "\t\t\t\t\t\t" + cor("Ervas Vermelhas", "vermelho") + ": " + personagem.bolsa.erva_vermelha);
  console.log(" Ataque: " + cor(personagem.ataque, "amarelo") + "\t\t\t\t\t\t" + cor("Moedas", "amarelo") + ": " + personagem.bolsa.moedas);
  //console.log(15+(tempo.dia*5));
  console.log();
}

//Função enter para continuar
function prosseguir() {
  let tt = prompt("Pressione Enter para continuar...")
}

//Função Batalha
function batalha(fase) {
  console.clear();
  let enemy;
  if (fase == "fase1") {
    enemy = lista_enemy[rng(2) - 1];
  }
  if (fase == "testeboss") {
    enemy = lista_enemy[4];
  }
  enemy.alucinar();
  //setTimeout(".")*1000;
  exibicao_de_dados();
  console.log("Um", enemy.nome, "aparaceu!");
  prosseguir();
  while (personagem.pv != 0 && enemy.pv != 0) {
    exibicao_de_dados();

    console.log("1. Atacar.\t\t\t\t\t" + enemy.nome);
    console.log("2. Concentrar.\t\t\t\t\t" + "Vida: " + enemy.pv);
    let acao = prompt("");
    //ATACAR-------------------------
    if (acao == 1) {
      exibicao_de_dados();
      let personatk = personagem.ataquecalc(personagem.concentracao);
      console.log("Você causou", personatk, "de dano ao", enemy.nome);
      //Tira vida do inimigo
      enemy.receber_dano(personatk);
      personagem.concentracao = false;
      prosseguir();

      if (enemy.pv <= 0) {
        exibicao_de_dados();
        console.log("Você derrotou o", enemy.nome);
        let recompensa = rng(11) + 14;
        personagem.bolsa.moedas += recompensa;
        console.log("Você obteve, " + recompensa + " Moedas.");
        if (rng(3) > 1 && enemy.nome == "Cervo") {
          personagem.bolsa.chifre_de_cervo += 1;
          console.log("Você obteve, 1 Chifre de Cervo.");
        }
        prosseguir();
        enemy.resetpv();
        break;
      }
      exibicao_de_dados();
      //Tira vida do personagem
      let danoinimigo = personagem.receber_dano(enemy.ataque);
      console.log(enemy.nome, "te atacou e causou", danoinimigo, "de dano à você.");
      prosseguir();
    }
    //CONCENTRAR------------
    if (acao == 2 && usodiario != true) {
      console.log("Você fecha seus olhos por um segundo, usando a meditação ancestral através do tempo tudo a sua volta parece mais lento, seu próximo ataque será crítico e vc recupera " + 2 + " pontos de vida.")
      personagem.pv += 2;
      personagem.concentracao = true;
      usodiario = true;
      prosseguir();
    } else if (acao == 2 && usodiario == true) {
      console.log("Você só pode usar essa habilidade 1 vez por dia.");
      prosseguir();
    }
    if (personagem.pv <= 0)
      break;
  }


}

//Função caça e coleta
function caca_coleta() {
  for (let i = 0; i < 3; i++) {
    if (rng(100) <= 75)
      batalha("fase1");
    if (personagem.pv <= 0)
      return;
  }
  let erva = rng(3);
  personagem.bolsa.erva_vermelha += erva;
  exibicao_de_dados();
  console.log("Você obteve " + erva + " ervas vemelhas durante sua coleta.");

}

//Função aleatória
function rng(range) {
  return Math.floor(Math.random() * (range) + 1);
}

//Função treinar
function treinar() {
  if (personagem.ataque < personagem.ataquepadrao * 2) {
    console.log("Você passou um tempo treinando seu ataque subiu de", personagem.ataque, "para", personagem.ataque + personagem.ataquepadrao / 4);
    personagem.ataque += personagem.ataquepadrao / 4;
    treino++;
  } else {
    console.log("Você chegou ao ápice da sua força");
  }
}

//Função investigar
function investigar() {

  if (investigacao < 3) {
    investigacao++;
  }
  switch (investigacao) {
    case 1:
      console.log("Durante a investigação vc observa um brilho estrando nos olhos das criaturas enlouquecidas.");
      break;
    case 2:
      console.log("Você pesquisa nos resgistros da vila e encontra informações que batem com o comportamento e brilho nos olhos das criaturas, aparentemente se trata de uma Maldição da Alucinação.");
      break;
    case 3:
      console.log("Você chega conclusão que não vai conseguir mais informações, parece melhor partir atrás de mais repostas fora do vilarejo.");
      break;
    case 4:
      console.log("Parece melhor partir atrás de mais repostas fora do vilarejo.");
      break;
  }

}


//função de interações na cidade
function cidade() {
  tempo.cronos(120);

  city: while (true) {
    console.clear();
    exibicao_de_dados();
    console.log("1. Vender 5 chifres de cervo. (30 moedas)");
    console.log("2. Comprar " + personagem.bolsa.armapadrao + " de Prata. (300 Moedas)");
    console.log("3. Voltar para o vilarejo - 2h");
    let choose = +prompt(">>");
    switch (choose) {
      case 1:
        if (personagem.bolsa.chifre_de_cervo >= 5) {
          console.log("Você vendeu 5 chifres, e recebeu 30 moedas");
          personagem.bolsa.chifre_de_cervo -= 5;
          personagem.bolsa.moedas += 30;
        } else {
          console.log("Você não possui itens suficientes");
        }
        prosseguir();
        break;
      case 2:
        if (personagem.bolsa.moedas >= 300 && personagem.bolsa.arma.slice(-9) != " de Prata") {
          console.log("Você adquiriu a " + personagem.bolsa.arma + " de Prata");
          personagem.bolsa.arma += " de Prata";
          personagem.ataque *= 2;
          personagem.pv += 8;
          personagem.pvpadrao = 18;
          personagem.bolsa.moedas -= 300;

        } else if (personagem.bolsa.arma.slice(-9) == " de Prata") {
          console.log("Você já possui esta arma.");

        } else if (personagem.bolsa.moedas < 300) {
          console.log("Você não possui moedas suficientes. ")
        }
        prosseguir();
        break;
      case 3:
        break city;
    }
  }
}

function cor(palavra, cor) {
  switch (cor) {
    case "vermelho":
      return "\033[0;91m" + palavra + "\033[0m";
    case "verde":
      return "\033[0;92m" + palavra + "\033[0m";
    case "amarelo":
      return "\033[0;93m" + palavra + "\033[0m";
    case "azul":
      return "\033[0;94m" + palavra + "\033[0m";
    case "rosa":
      return "\033[0;95m" + palavra + "\033[0m";
    case "ciano":
      return "\033[0;96m" + palavra + "\033[0m";
    case "negrito":
      return "\033[1;1m" + palavra + "\033[0m";
    case "italico":
      return "\033[3;97m" + palavra + "\033[0m";
    case "sublinhado":
      return "\033[4;97m" + palavra + "\033[0m";
    case "tachado":
      return "\033[9;97m" + palavra + "\033[0m";
    case "fundo vermelho":
      return "\033[0;41m" + palavra + "\033[0m";
    case "fundo rosa":
      return "\033[3;105m" + palavra + "\033[0m";
    case "ciano italico":
      return "\033[3;96m" + palavra + "\033[0m";
  }

}







//*******************************************************************************
//Introdução e perguntas iniciais.
console.log('"Curse Of Hallucination", interactive game, version: 0.1');

console.log("");
console.log("Você é um habitante de um país chamado Hutal e mora num pequeno vilarejo no canto deste país, você é o líder deste vilarejo e recentemente tem tido problemas com seres enlouquecidos aparecendo em florestas e estradas, atrapalhando a caça, a coleta e o transporte de mercadorias.")
console.log("Como líder você deve resolver este problema, pelo o bem estar de seus moradores, enquanto lida com seus afazeres diários.");
console.log("");


//Definição de nome

//Caracteres permitidos
let caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZãõáéíóúÃÕÁÉÍÓÚ";
let ok = true;

//While de validação de nome.
while (true) {
  let nome = prompt("Seu nome:")
  if (nome.length >= 13 || nome.length <= 2) {
    console.clear();
    console.log("Nome muito grande ou pequeno, digite no máximo 12 caracteres e no mínimo 3.");
    continue;//se nome tiver tamanho inválido reseta o laço.
  }
  for (let i = 0; i < nome.length; i++) {
    for (let j = 0; j < caracteres.length; j++) {
      if (nome[i] == caracteres[j]) {
        ok = true
        break;
      }
      ok = false;
    }
    if (ok == false) {//se qualquer caracter inválido aparecer reseta a verificação e pede uma nova entrada.
      console.clear();
      console.log("Não é permitido caracteres especiais, espaços ou números");
      break;//se caracter não for correspondente a lista de caracteres validos encerra for externo com "ok" falso
    }
  }
  if (ok == true) {//se todos os caracteres forem validos encerra while de validação
    personagem.nome = nome;
    console.log("Seu nome é " + personagem.nome + ", correto?(S/N)");
    let eh = prompt(">>");
    eh = eh.toLowerCase();
    if (eh == "s") {
      break;
    }
  }
}


//Definição de classe de combate
console.clear();
while (true) {
  console.log("Em qual classe de combate você é especialzado?")
  console.log();

  console.log("1. Guerreiro-> Resistente, seus ataques são fortes porém lentos.");
  console.log("2. Ninja-> Semi-resistente, seus ataques são fracos porém rápidos e com chances elevadas de causar danos críticos.");
  console.log("3. Arqueiro-> Frágil porém com chances elevadas de se esquivar evitando qualquer dano e seus ataques são fortes e rápidos.");
  console.log("4. Exibir detalhes dos status de cada classe.");

  console.log();
  console.log("Digite 1, 2, 3 ou 4.")
  let entrada = prompt(">>");
  if (entrada == "1" || entrada == "2" || entrada == "3") {
    personagem.class_select(statusinicial[entrada - 1][0], statusinicial[entrada - 1][1], statusinicial[entrada - 1][2], statusinicial[entrada - 1][3], statusinicial[entrada - 1][4], statusinicial[entrada - 1][5], statusinicial[entrada - 1][6]);
    break;
  }
  if (entrada == 4) {
    console.log("Em desenvolvimento ;)");
    prosseguir();
    console.clear();
    continue;
  }
  console.clear();
  console.log("Resposta inválida.");
}


//*************************************************************************************
//Inicio da gameplay.
//Primeiro Ciclo.
king: while (true) {
  exibicao_de_dados();
  console.log("1. Sair para caçar e coletar. - 8h");
  console.log("2. Treinar. (" + treino + "/4) - 6h");
  console.log("3. Ir a cidade próxima para comprar e vender recursos. - 2h");
  console.log("4. Investigar o que pode estar enlouquecendo as criaturas. (" + investigacao + "/3) - 4h");
  console.log("5. Usar Erva Vermelha para restaurar a vida. (" + cor("Curar", "verde") + ")");
  if (investigacao >= 3) {
    console.log("");
    console.log("6. Deixar o vilarejo aos cuidados da sua filha mais velha e partir para próxima região.");
    six = 6;
  }
  let choose = +prompt(">>");

  switch (choose) {
    case 1:
      caca_coleta();
      tempo.cronos(517);
      break;
    case 2:
      treinar();
      tempo.cronos(345);
      break;
    case 3:
      cidade();
      tempo.cronos(122);
      break;
    case 4:
      investigar();
      tempo.cronos(243);
      break;
    case 5:
      personagem.curar();
      break;
    case six:
      while (true) {
        console.log();
        console.log(cor("Parte 2 em breve no Patch: v0.2 ;)", "verde"));
        console.log(cor("Você pode experimentar o Boss da Parte 2, que tal?(S/N)", "amarelo"));
        let sixteste = prompt(">>");
        if (sixteste.toLowerCase() == "s") {
          batalha("testeboss");
          if (personagem.pv > 0) {
            console.log(cor("PARABÉÉÉÉÉNS!!! VOCÊ ZEROU O JOGO!", "verde"))
          }
        }
        break;
      }
      break;
    case 7:
      break king;
    case 8:
      console.log(personagem);

  }
  if (personagem.pv <= 0) {
    console.clear(); console.log(cor("\n\n\t\t\t\t*********GAME*OVER**********\n\n", "fundo vermelho"), "+");
    break;
  }
  if (tempo.hora <= 6 && tempo.dia != 1) {
    prosseguir();
    exibicao_de_dados();
    tempo.cronos(360);
    console.log();
    console.log("Já é tarde e você se sente cansado, você volta para casa e descansa por 6 horas...");
    console.log("Agora são " + tempo.horastring + ":" + tempo.minutostring);
    console.log();
    usodiario = false;
  }
  prosseguir();
}
















//Interactive game, "Curse of hallucination", version: 0.1;

//Qual é o seu nome?//validação de texto
//Seu nome é **** correto?



//Você é um habitante de um país chamado Hutal e mora num pequeno vilarejo no canto deste país, e você é o líder deste vilarejo e recentemente tem tido problemas com seres enlouquecido aparecendo em florestas e estradas, atrapalhando a caça, a coleta e o transporte de mercadorias.
//Como líder você deve resolver este problema, pelo o bem estar de seus moradores.



//Sua classe de combate é:
//1-Guerreiro-> Resistente, seus ataques são fortes porém lentos.
//2-Ninja-> Semi-resistente, seus ataques são fracos porém rápidos e com chances elevadas de causar danos críticos.
//3-Arqueiro-> Frágil porém com chances elevadas de se esquivar evitando qualquer dano e seus ataques são fortes e rápidos.
//4-Exibir detalhes dos status de cada classe.

//Aperte enter para começar.


// CICLO-01
//1-Sair para caçar e coletar.(75% de chance de entrar numa batalha)batalhar dão recursos(comida e dinheiro), sempre coleta ervas medicinais.
//2-Treinar.
//3-Ir a cidade próxima para comprar e vender recursos.(Vender comida para conseguir dinheiro)(comprar espada)
//4-Investigar o que pode estar eslouquecendo as criaturas.
//5-Deixar o vilarejo aos cuidados da sua filha mais velha e partir para próxima região.(opção liberada apenas depois de ter avançado nas investigações)

// CICLO-02
//1-caçar e coletar.
//2-Eplorar área.
//3-Entrar na toca do Leão Rei das montanhas.(opção liberada após explorar o suficiente)
//4-Investigar a maldição.
//5-Subir a montanha(opção liberada apenas depois de ter avançado nas investigações)
//



//EXTRA - Seus esforços não vão consertar os erros e a insolência de seu Rei.
//EXTRA - Adicionar idioma inglês e japonês.

//Resposta criptografada para a pergunta que pode dar uma Vida extra.


//console.log("oi");

/*
IMPORTANTE
-implementar função de cores
-implementar detalhes de classe.
-colocar acesso à bolsa.nnnnnnnnnnnnn





-Durante a investigação vc observa um brilho estrando nos olhos das criaturas enlouquecidas.
-Você pesquisa nos resgistros da vila e encontra informações que batem com o comportamento e brilho nos olhos das criaturas, aparentemente se trata de uma Maldição da Alucinação.
-Você chega conclusão que não vai conseguir mais informações, parece melhor partir atrás de mais repostas fora do vilarejo.
*/