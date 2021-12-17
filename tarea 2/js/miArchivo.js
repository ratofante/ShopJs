function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
const adivinanza = randomIntFromInterval(1, 20);
//console.log(adivinanza);

window.onload = function (){
    var retry = document.getElementById("retry");
    var guide = document.getElementById("guide");
    var response = document.getElementById("respose");
};

var intentos = 5;
console.log(intentos);
function checkNum(num){
    if(parseInt(num) > adivinanza ){
        guide.innerHTML = "El número es menor";
        cuenta();
    } else if (parseInt(num) < adivinanza){
        guide.innerHTML = "El número es mayor";
        cuenta();
    } else {
        guide.innerHTML = "correcto!";

    }
}
function cuenta(){
    intentos--;
    console.log(intentos);
    if (intentos === 0) {
        response.classList.remove('showMe');
        response.classList.add('hideMe');
        retry.classList.remove('hideMe');
        retry.classList.add('showMe');
        guide.innerHTML = "Perdiste!";
    }
}