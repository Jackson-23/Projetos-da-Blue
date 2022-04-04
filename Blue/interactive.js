// Definindo o Prompt
const prompt = require('prompt-sync')();
console.clear();

//Declaração de variáveis
let nivel_de_alucinacao = 10;
let investigacao = 0;//para marcar progresso de investigação.
//lista para armezanar tabela de status à ser inserido ao objeto personagem dependendo da classe escolhida
let status = [["Guerreiro", 8, 4, 60, 1, 1,"Espada"],
               ["Ninja", 4, 2, 100, 1, 60,"Katana"],
               ["Arqueiro", 8, 1, 100, 60, 1,"Arco"]]

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
    bolsa: {
      erva_vermelha: 10,//Restaura Vida
      carne: 0,
      moedas: 50,
      arma: "",
      armapadrao: "", 
    },
    //Método para alterar status do personagem de acordo com a classe escolhida. 
    class_select: function(classe, atk, def, txacc, txesq, txcrt, equip){
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
    ataquecalc: function calc() {
      if(rng(100)>this.taxadeacerto){
        console.log("Você errou o ataque!");
        return 0;
      }
      if(rng(100)<=this.taxadecritico){
        console.log("Você acertou um ataque crítico!");
        return this.ataque*2;
      }
      
      return this.ataque;
    },

    //Método para receber dano
    receber_dano: function subtrairdano(atk) {
      if(rng(100)<=this.taxadeesquiva){
        console.log("Você consegue se esquivar do ataque!")
        return 0;
      }
      this.pv -= (atk/this.defesa);
      return(atk/this.defesa);
    },
    //Método para restaurar pv
    curar: function curar() {
      this.pv = this.pvpadrao;
      this.bolsa.erva_vermelha--;
    }

}

//Construtor de objetos inimigo
function inimigo (nome, pv, ataque){
        this.nome = nome,
        this.pv = pv,
        this.pvpadrao = pv,
        this.ataque = ataque,
        this.taxadecritico= 1,
        this.alucinado = false,
        //método para aplicar dano na vida(pv)
        this.receber_dano = function subtrairdano(atk) {
          this.pv -= atk;
        },
        //método para aplicar o efeito (Alucinar) que altera os status do inimigo
        this.alucinar = function alucinar(){
          if(rng(100)<=nivel_de_alucinacao){  
            this.ataque *= 2;
            if(this.nome == "Leão Rei")
              this.pv = 100;
            if(this.nome == "Dragão")
              this.pv = 200;
            this.nome += " Alucinado";
            this.alucinado = true;
          }
        },

        this.resetpv = function resetpv() {
          this.pv = this.pvpadrao;
          if(this.alucinado == true){
            this.desalucinar();
            this.alucinado = false;
          }
        },
          
        this.desalucinar = function desalucinar() {
          this.ataque /=2;
          this.nome = this.nome.slice(0,-10);
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
let lista_enemy =[];
lista_enemy.push(cervo);
lista_enemy.push(bandido);
lista_enemy.push(lobo);
lista_enemy.push(urso);
lista_enemy.push(leao);
lista_enemy.push(dragao);


const tempo = {
  dia: 1,
  hora: 6,
  minuto:47,

  cronos: function(mins){
    let horaconvert = mins/60;
    let minutorest = mins%60;
    this.hora += Math.floor(horaconvert);
    this.minuto += minutorest;
    if(this.minuto >= 60){
      this.minuto -= 60;
      this.hora++;
    } 
    if(this.hora >= 24){
      this.hora -= 24;
      this.dia++;
      nivel_de_alucinacao += 2;
    }
    
  },
  exibir: function(){
  let result = this.hora + ":" + this.minuto + "h" +" - "+ "Dia: " + this.dia;
   return result;
  }
}



//DECLACARÇÃO DE FUÇÕES*************************
//Função exibição de dados
function exibicao_de_dados(){
  console.clear();
  console.log("\t\t\t\t\t\t\t" + tempo.exibir());
  console.log("-"+personagem.nome+"-")
  console.log(" Vida: "+ personagem.pv +"\t\t\t\t\t\tErvas Vermelhas: "+personagem.bolsa.erva_vermelha );
  console.log(" Ataque: "+ personagem.ataque + "\t\t\t\t\t\tMoedas: "+ personagem.bolsa.moedas);
  console.log(nivel_de_alucinacao);
  console.log();
}

//Função enter para continuar
function prosseguir(){
  let tt =  prompt("Pressione Enter para continuar...")
}

//Função Batalha
function batalha(){
  console.clear();
  let enemy = lista_enemy[rng(1)];
  enemy.alucinar();
  //setTimeout(".")*1000;
  exibicao_de_dados();
  console.log("Um", enemy.nome, "aparaceu!");
  prosseguir();
  while(personagem.pv != 0 && enemy.pv != 0){
    exibicao_de_dados();
    
    console.log("1. Atacar.\t\t\t\t\t"+enemy.nome);
    console.log("2. Fugir.\t\t\t\t\t"+"Vida: "+enemy.pv);
    let acao = prompt("");
    if(acao == 1){
      exibicao_de_dados();
      let personatk = personagem.ataquecalc();
      console.log("Você causou", personatk, "de dano ao", enemy.nome);
      //Tira vida do inimigo
      enemy.receber_dano(personatk);
      prosseguir();

      if(enemy.pv <= 0){
        exibicao_de_dados();
        console.log("Você derrotou o", enemy.nome);
        prosseguir();
        enemy.resetpv();
        break;
      }
      exibicao_de_dados();
      //Tira vida do personagem
      let danoinimigo = personagem.receber_dano(enemy.ataque);
      console.log(enemy.nome,"te atacou e causou", danoinimigo, "de dano à você.");    
      prosseguir();
    }
    if(personagem.pv <= 0)
      break;
  }
  

}

//Função caça e coleta
function caca_coleta() {
  for(let i=0;i<3;i++){
  if(rng(100)<=75)
    batalha();
    if(personagem.pv <= 0)
    return;
  }
  let erva = rng(3);
  personagem.bolsa.erva_vermelha += erva;
  exibicao_de_dados();
  console.log("Você obteve " + erva + " ervas vemelhas.");
  
}

//Função aleatória
function rng(range){
  return Math.floor(Math.random()*(range)+1);
}

//Função treinar
function treinar(){
  if(personagem.ataque < personagem.ataquepadrao*2){
        console.log("Você passou um tempo treinando seu ataque subiu de", personagem.ataque,"para",personagem.ataque + personagem.ataquepadrao/4);
        personagem.ataque += personagem.ataquepadrao/4;
  }else{
      console.log("Você chegou ao ápice da sua força");
  }
}

//função de interações na cidade
function cidade(){
  tempo.cronos(120);
  console.clear();
  console.log("1. Vender alimento (carne-20)*1,8).");
  console.log("2. Comprar "+ personagem.bolsa.armapadrao +" de Prata (300 Moedas)");
  let choose = +prompt(">>");
  switch(choose){
    case 1:
      console.log("Vendido");
      prosseguir();
      break;
    case 2:
      if(personagem.bolsa.moedas >= 300 && personagem.bolsa.arma.slice(-9) != " de Prata"){
        console.log("Você adquiriu a "+ personagem.bolsa.arma +" de Prata");
        personagem.bolsa.arma += " de Prata";
        personagem.ataque *=2;
        personagem.pv +=8;
        personagem.pvpadrao = 18;
        personagem.bolsa.moedas -= 300;

      }else if(personagem.bolsa.arma.slice(-9) == " de Prata"){
        console.log("Você já possui esta arma.");
        
      }else if(personagem.bolsa.moedas < 300){
        console.log("Você não possui moedas suficientes. ")
      }
      prosseguir();
      break;
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
while(true){
  let nome = prompt("Seu nome:")
  if(nome.length >= 13 || nome.length <= 2){
    console.clear();
    console.log("Nome muito grande ou pequeno, digite no máximo 12 caracteres e no mínimo 3.");
    continue;//se nome tiver tamanho inválido reseta o laço.
  }
  for (let i=0;i < nome.length; i++){
    for (let j=0;j < caracteres.length;j++){
      if(nome[i] == caracteres[j]){
        ok = true
        break;
      }
      ok = false;
    } 
    if(ok == false){//se qualquer caracter inválido aparecer reseta a verificação e pede uma nova entrada.
      console.clear();
      console.log("Não é permitido caracteres especiais, espaços ou números");
      break;//se caracter não for correspondente a lista de caracteres validos encerra for externo com "ok" falso
    }
  }
  if(ok==true){//se todos os caracteres forem validos encerra while de validação
    personagem.nome = nome;
    console.log ("Seu nome é " + personagem.nome + ", correto?(S/N)");
    let eh = prompt(">>");
    eh = eh.toLowerCase();
    if(eh == "s"){
    break;
    }
  }
}


//Definição de classe de combate
console.clear();
while(true){
  console.log("Em qual classe de combate você é especialzado?")
  console.log();
  
  console.log("1. Guerreiro-> Resistente, seus ataques são fortes porém lentos.");
  console.log("2. Ninja-> Semi-resistente, seus ataques são fracos porém rápidos e com chances elevadas de causar danos críticos.");
  console.log("3. Arqueiro-> Frágil porém com chances elevadas de se esquivar evitando qualquer dano e seus ataques são fortes e rápidos.");
  console.log("4. Exibir detalhes dos status de cada classe.");

  console.log();
  console.log("Digite 1, 2, 3 ou 4.")
  let entrada = prompt(">>");
  if(entrada == "1" || entrada == "2" || entrada == "3"){
      personagem.class_select(status[entrada-1][0],status[entrada-1][1],status[entrada-1][2],status[entrada-1][3],status[entrada-1][4],status[entrada-1][5],status[entrada-1][6]);
    break;
  }
  if(entrada == 4){
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
king: while(true){
  exibicao_de_dados();
  console.log("1. Sair para caçar e coletar.");
  console.log("2. Treinar.");
  console.log("3. Ir a cidade próxima para comprar e vender recursos.");
  console.log("4. Investigar o que pode estar enlouquecendo as criaturas.");
  console.log("5. Usar Erva Vermelha para restaurar a vida");
  if(investigacao >= 3){
    console.log("6. Deixar o vilarejo aos cuidados da sua filha mais velha e partir para próxima região.");
  }
  let choose = +prompt(">>");

  switch(choose){
    case 1:
      caca_coleta();
      tempo.cronos(480);
      break;
    case 2:
      treinar();
      tempo.cronos(360);
      break;
    case 3:
      cidade();
      tempo.cronos(120);
      break;
    case 4:
      console.log("investigou");
      investigacao++;
      tempo.cronos(240);
      break;
    case 5:
      personagem.curar();
      break;
    case 6:
      console.log("Em breve no Patch: v0.2 ;)")
      break;
    case 7:
      break king;
    case 8:
      console.log(personagem);
      
  }
  if(personagem.pv <= 0){
    console.clear(); console.log("\n\n\t\t\t\t*********GAME*OVER**********\n\n");
    break;
  }
  console.log("menu");
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
-inserir período de descanso.
-melhorar aleatoriedade da aparição de monstros(arrumar fugir).
-implementar opções da cidade
-desenvolver mais a lore da investigação.


-colocar contador visual de treino e investigação.
-implementar detalhes de classe.nnnnnn
-colocar acesso à bolsa.nnnnnnn
-implementar função de cores

*/