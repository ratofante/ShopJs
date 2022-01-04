$(document).ready(function(){
    $("#pokeSearch").keyup(function() {
        var text = $(this).val();
        console.log(text);
        getHint(text);
    });
})

function getHint(text) {
    let hint = "";
    for (var key in pokeIndex) {

        let pokemon = pokeIndex[key];

        if(pokemon.includes(text)){
            hint += pokeIndex[key] + " ";
        }
    }
    $("#pokeHint").html(hint + " ");       
};





var pokemon = {};
var myReq = new XMLHttpRequest();

myReq.open("GET", urlPokeApi);

myReq.onload = function () {
    pokemon = JSON.parse(this.response);
    console.log(pokemon.name);
    console.log(pokemon);
}
myReq.send();