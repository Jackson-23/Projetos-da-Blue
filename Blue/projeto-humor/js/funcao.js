let cont=0;
function changeImage(image){
    if(cont == 0){
    document.getElementById(image).src="./images/natsuirritado.gif";
    }
    if(cont == 1){
    document.getElementById(image).src="./images/natsurage.gif";
    }
    if(cont == 2){
    document.getElementById(image).src="./images/natsuhappy.gif";
    }
    if(cont == 3){
    document.getElementById(image).src="./images/natsuserio.gif";
    cont = -1;
    }
    cont++
}