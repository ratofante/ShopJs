/**
 * findPokemon
 * 
 * 
 * 
 */

$(document).ready(function(){

    $("#pokeSearch").on("input", function() {
        $("#candidatos").empty();
        var text = $(this).val();

        var pokemons = findPokemon.getHint(text, "#pokeHint");
        if(Array.isArray(pokemons)){
            console.log(pokemons);
            findPokemon.createSearchInput(pokemons, "#candidatos");
        }
    });
})



/*function getHint(text) {
    let hint = "";
    for (var key in pokeIndex) {

        let pokemon = pokeIndex[key];

        if(pokemon.includes(text) && text != ""){
            hint += pokeIndex[key] + " ";
            pokeArray.push(pokeIndex[key]+"/"+key);
        }
    }
    if(pokeArray.length < 5 && pokeArray.length != 0){
        $("#pokeHint").addClass("hidden");
        
    }
    else {
        $("#pokeHint").removeClass("hidden");
        $("#pokeHint").html(hint + " "); 
    }        
};


function searchPokemon()



var pokemon = {};
var myReq = new XMLHttpRequest();

myReq.open("GET", urlPokeApi);

myReq.onload = function () {
    pokemon = JSON.parse(this.response);
    console.log(pokemon.name);
    console.log(pokemon);
}
myReq.send();*/