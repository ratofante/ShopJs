function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
const adivinanza = randomIntFromInterval(1, 20);
//console.log(adivinanza);

window.onload = function (){
    var retry = document.getElementById("retry");
    var guide = document.getElementById("guide");
    var response = document.getElementById("respose");
    var input = document.getElementById("input");
};

var intentos = 5;
console.log(intentos);
console.log(adivinanza);
function checkNum(num){
    switch (true) {
        case (parseInt(num) > adivinanza):
            guide.innerHTML = "El número es menor que" + num;
            cuenta();
            input.innerHTML = "Te quedan " + intentos + " intentos";
            break;
        case (parseInt(num) < adivinanza):
            guide.innerHTML = "El número es mayor que " + num;
            cuenta();
            input.innerHTML = "Te quedan " + intentos + " intentos";
            break;
        default:
            guide.innerHTML = "Correcto!";
            reTry();
            break;
    }
}

function reTry(){
    response.classList.remove('showMe');
    response.classList.add('hideMe');
    retry.classList.remove('hideMe');
    retry.classList.add('showMe');
}

function cuenta(){
    intentos--;
    console.log(intentos);
    if (intentos === 0) {
        reTry();
        guide.innerHTML = "Perdiste!";
    }
}