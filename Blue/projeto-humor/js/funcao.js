let cont=0;
texto1 = "Natsu é um mago do fogo e membro de uma guilda chamada Fairy Tail, a maior guilda de todos os tempos. Ele é personagem descontraído e ao lado do seu pequeno amigo querido \"Happy\" está a procura de seu pai desaparecido.";
texto2 = "Quando está lutando à sério pode liberar o poder do dragão, fazendo até que escamas apareçam pela sua pele";
texto3 = "Quando está com Raiva pode liberar um poder destrutivo de fogo fora do comum.";
texto4 = "Depois de uma batalha de vida ou morte, esbanja despreocupação já que deu tudo certo.";

function changeImage(image, text){
    if(cont == 0){
    document.getElementById(image).src="./images/natsuirritado.gif";
    document.getElementById(text).innerHTML = texto2;
    }
    if(cont == 1){
    document.getElementById(image).src="./images/natsurage.gif";
    document.getElementById(text).innerHTML = texto3;
    }
    if(cont == 2){
    document.getElementById(image).src="./images/natsuhappy.gif";
    document.getElementById(text).innerHTML = texto4;
    }
    if(cont == 3){
    document.getElementById(image).src="./images/natsuserio.gif";
    document.getElementById(text).innerHTML = texto1;
    cont = -1;
    }
    cont++
}