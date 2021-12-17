function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
const adivinanza = randomIntFromInterval(1, 20);
//console.log(adivinanza);

window.onload = function (){
    //var response = document.getElementById("response");
    var guide = document.getElementById("guide");
};

function checkNum(num){
    if(parseInt(num) > adivinanza ){
        guide.innerHTML = "El número es menor";
    } else if (parseInt(num) < adivinanza){
        guide.innerHTML = "El número es mayor";
    } else {
        guide.innerHTML = "correcto!";
    }
}
