
var pokemon = {};
var myReq = new XMLHttpRequest();

myReq.open("GET", "https://pokeapi.co/api/v2/pokemon-species/25");

myReq.onload = function () {
    pokemon = JSON.parse(this.response);
    console.log(pokemon.name);
}
myReq.send();