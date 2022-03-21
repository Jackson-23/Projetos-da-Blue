//Declaração de váriaveis e arrays
let elementos = ["fogo", "agua", "gelo"];
let elementos_color = ["\033[1;31mfogo\033[0;0m", "\033[1;34magua\033[0;0m", "\033[1;36mgelo\033[0;0m"];
let vitoria = "\033[1;32mVitória\033[0m", derrota = "\033[31mDerrota\033[0m", empate = "Empate";
let registro=[[],[],[]];
let rodadas = 5;
let pontosp1=0,pontospc=0;
let player1 = "", com = "";


// Definindo o Prompt
const prompt = require('prompt-sync')();
console.clear();


//Exibção de Regras jogo.
  console.log("Bem vindo à Guerra dos elementos, explicarei as regras à você:");
  console.log();
  console.log("Primeiro, você deverá escolher quantas rodadas deseja jogar, digitando a quantidade no console.");
  console.log("Segundo, você deverá escolher o elemento para atacar a cada rodada.");
  console.log("Para escolher o elemento digite:");
  console.log("1 ou \"Fogo\" para usar Fogo;");
  console.log("2 ou \"Agua\" para usar Água;");
  console.log("3 ou \"Gelo\" para usar Gelo;");
  console.log("Lembre-se Fogo derrete Gelo, Água apaga o Fogo e Gelo congela a Água.");
  console.log();
  let con = prompt("Aperte Enter para continuar.");
  console.clear();


//Pergunta de quantas rodadas são desejadas com prompt e com o while para validação.
while(true){ 
  console.log("Digite a quantidade de rodadas que você deseja jogar:");
  rodadas = +prompt(">> ");
  if(typeof rodadas == "number" && !isNaN(rodadas)){
    break;
  }
  console.clear();
  console.log("\033[1;31mResposta inválida.\033[0;0m");
}
console.clear();


//Sequência de escolhas do usuário
for (let i=0 ;i < rodadas ;i++){
  let n = 3;
  player1="";
  
  while(player1 != "fogo" && player1 != "agua" && player1 != "gelo"){
    console.log("Rodada",i+1,"de",rodadas);
    console.log("Digite: 1 ou \"Fogo\" \\ 2 ou \"Agua\" \\ 3 ou \"Gelo\", para escolher seu ataque:");
    player1 = prompt(">> ");
    if(player1 == 1 || player1 == 2 || player1 == 3){
      player1 = elementos[player1-1];
    }
    player1 = player1.toLowerCase();
    if(player1 == "fogo"){
      n = 0; break;
    }else if(player1 == "agua"){
      n = 1; break;
    }else if(player1 == "gelo"){
      n = 2; break;
    }
    console.clear();
    console.log("\033[1;31mResposta inválida.\033[0;0m");
  }

  //Escolha aleatória da máquina.
  let rng = Math.floor(Math.random()*3);
  com = (elementos[rng])

  //Exibição do resultado da rodada atual.
  console.clear();
  console.log(elementos_color[n] + " X " + elementos_color[rng]);
  //Registro de rodadas
  registro[0][i] = elementos_color[n];
  registro[1][i] = elementos_color[rng];

  //Teste Fogo
  if(player1 == "fogo"){
    if(com == "gelo"){
      console.log("Palyer 1 marca ponto");
      pontosp1++;
      registro[2][i] = vitoria;
    }
    if(com == "agua"){
      console.log("Máquina marca ponto");
      pontospc++;
      registro[2][i] = derrota;
    }
    
  }
  //Teste Agua
  if(player1 == "agua"){
    if(com == "fogo"){
      console.log("Palyer 1 marca ponto");
      pontosp1++;
      registro[2][i] = vitoria;
    }
    if(com == "gelo"){
      console.log("Máquina marca ponto");
      pontospc++;
      registro[2][i] = derrota;
    }
    
  }
  //Teste Gelo
  if(player1 == "gelo"){
    if(com == "agua"){
      console.log("Palyer 1 marca ponto");
      pontosp1++;
      registro[2][i] = vitoria;
    }
    if(com == "fogo"){
      console.log("Máquina marca ponto");
      pontospc++;
      registro[2][i] = derrota;
    }
    
  }
  if(player1 == com){
    console.log("Empate!!");
    registro[2][i] = empate;
  }
  console.log("");
}


//Exibição do registro de partidas.
console.clear();
for(let i=0; i<rodadas ;i++){
  console.log("Rodada " + (i+1) + ": " + registro[0][i] + " X " + registro[1][i], registro[2][i]);
}

//Exibição de mensagem declarando o vencedor.
console.log();
if(pontosp1>pontospc){
  console.log("\033[1;32mVOCÊ VENCEU A MÁQUINA!!!\033[0m");
}else if(pontosp1<pontospc){
  console.log("\033[31mA Máquina te Derrotou...\033[0m");
}else if(pontosp1==pontospc){
  console.log("Empate, foi uma batalha acirrada.");
}

//Exibição do Placar Final
console.log("Player ("+ pontosp1 +")X(" + pontospc + ") Máquina");
console.log();