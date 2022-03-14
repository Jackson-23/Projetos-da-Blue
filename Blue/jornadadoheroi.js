// Declaração de variável para contagem pontos para cada conquista realizada e variáveis de respostas recebidas pelo prompt.
let pontos = 0;
let q1="", q2="", q3="", q4="", q5="";
// Declaração de variáveis contendo nomes com cores personalisadas para o console.
let corvo_sombrio = "\033[35m" + "Corvo Sombrio" + "\033[0m";
let cervo_mistico = "\033[1;34m" + "Cervo Místico" + "\033[0m";
let aranha_transparente = "\033[1;37m" + "Aranha Transparente" + "\033[0m";
let cao_lendario ="\033[0;33m" + "Cão Lendário" + "\033[0m";
let capturado = "\033[1;32m" + "foi capturado" + "\033[0m";
let ncapturado = "\033[31m" + "não foi capturado" + "\033[0m";
let capturada = "\033[1;32m" + "foi capturada" + "\033[0m";
let ncapturada = "\033[31m" + "não foi capturada" + "\033[0m";


// Definindo o Prompt
const prompt = require('prompt-sync')();


// Exibição da história vivida pelo personagem.
console.clear();
console.log("Jin acaba de retornar de sua busca, que tinha como finalidade obter pelo menos três -Familiares Espirituais- e um conhecimento secreto");
console.log();


// Sequencia de Perguntas sobre o seu progresso
console.log("Agora eu preciso saber!");
// Pergunta 1
//for para se manter na mesma pergunta até que seja dada uma resposta válida.
while (true){
  q1 = prompt("Você capturou o " + corvo_sombrio +       "?(Sim/Não)");
  q1 = q1.toLowerCase();
  if(q1 == 's' || q1 == 'sim'){
      q1 = 's';
      pontos++;
      break;
    }else if(q1 == 'n' || q1 == 'nao' || q1 == 'não'){
      q1 = 'n';  
      break;
    }else{
      console.clear();
      console.log('Esta resposta não é valida, agora me diga:'); 
    }
}

// Pergunta 2
while (true){
  q2 = prompt("Você capturou o " + cervo_mistico + "?(Sim/Não)").toLowerCase();
  if(q2 == 's' || q2 == 'sim'){
    q2 = 's';
    pontos++;
    break;
  }else if(q2 == 'n' || q2 == 'nao' || q2 == 'não'){
    q2 = 'n';  
    break;
  }else{
  console.clear();
   console.log('Esta resposta não é valida, agora me diga:'); 
  }
}

// Pergunta 3
while (true){
  q3 = prompt("Você capturou a " + aranha_transparente + "?(Sim/Não)");
  q3 = q3.toLowerCase();
  if(q3 == 's' || q3 == 'sim'){
    q3 = 's';
    pontos++;
    break;
  }else if(q3 == 'n' || q3 == 'nao' || q3 == 'não'){
    q3 = 'n';
    break;
  }else{
    console.clear();
    console.log('Esta resposta não é valida, agora me diga:'); 
  }
}

// Pergunta 4
while(true){
  q4 = prompt("Você sentiu uma presença misteriosa próxima e foi à procura, você conseguiu encontrá-la?(Sim/Não)");
  q4 = q4.toLowerCase();
  if(q4 == 's' || q4 == 'sim'){
    q4 = 's';
    pontos ++;

    // Pergunta 5
    while(true){
      console.log();
      q5 = prompt("Você adquiriu conhecimento da entrada da caverna brilhante, e dentro dela você encontrou um Majestoso " +       
      cao_lendario + ", você tentou capturá-lo?(Sim/Não)");
      q5 = q5.toLowerCase();
      if(q5 == 's' || q5 == 'sim'){
        q5 = 's';
    
        if(pontos >= 3){
          console.log();
          console.log("Você conseguiu Capturá-lo!!!");
          pontos++
          let con = prompt("Aperte Enter para continuar.");
          break;
        }else{
          q5 = 'n';
          console.log();
          console.log("Você não possuía Espíritos suficientes para enfrentá-lo, ele foi embora. (Você falha automáticamente no 5º Objetivo)")
          let con = prompt("Aperte Enter para continuar.");
          break;
        }  
      }else if(q5 == 'n' || q5 == 'nao' || q5 == 'não'){
        q5 = 'n';
        break;
      }
      console.clear();
      console.log('Esta resposta não é valida, agora me diga:'); 
    }
    break;
  }else if(q4 == 'n' || q4 == 'nao' || q4 == 'não'){
    q4 = 'n';
    console.log();
    console.log("A presença desapareceu.(Você falha automáticamente no 5º Objetivo)")
    let con = prompt("Aperte Enter para continuar.");
    break;
  }
    console.clear();
    console.log('Esta resposta não é valida, agora me diga:'); 
} 
// Exibição dos Resultado da aventura de acordo com os pontos adquiridos.
console.clear();
if(pontos == 0)
console.log("Você falhou miseravelmente.");
if(pontos == 1 || pontos == 2)
console.log("Você falhou, mas ainda conseguiu algo.");
if(pontos == 3)
console.log("Você chega perto de conseguir alcançar seu objetivo, mas acaba falhando por pouco.");
if(pontos == 4)
console.log("Depois de muito esforço você conquista seu objetivo, embora não de maneira perfeita.");
if(pontos == 5)
console.log("Você triunfa de maneira inquestionável e seus feitos serão lembrados por muitas gerações.");

//Exibição dos resultados de acordo com os Espíritos capturados e no sucesso ou não de concluir um objetivo.
console.log();
//Corvo
if(q1 == 's'){
  console.log("O" , corvo_sombrio , capturado);
}else{
  console.log("O" , corvo_sombrio , ncapturado);
}

//Cervo
if(q2 == 's'){
  console.log("O", cervo_mistico , capturado);
}else{
  console.log("O", cervo_mistico , ncapturado);
}

//Aranha
if(q3 == 's'){
  console.log("A", aranha_transparente , capturada);
}else{
  console.log("A", aranha_transparente , ncapturada);
}

//Conhecimento secreto
if(q4 == 's'){
  console.log("O conhecimento secreto \033[1;32mfoi adiquirido\033[0m.");
}else{
  console.log("O conhecimento secreto \033[31mnão foi adiquirido\033[0m.");
  console.log("Uma presença mistoriosa e poderosa \033[31mfoi perdida\033[0m, o que será que estava a espreita.");
}

//Cão
if(q5 == 's'){
  console.log("O" , cao_lendario , "um poderoso espírito agora \033[1;32mestá ao seu lado\033[0m.");
}

//Batalha fracassada.
if(q4 == 's' && q5 == 'n')
  console.log("O" , cao_lendario , "te derrotou e", ncapturado + ".");

console.log();