/***
 * Para crear una lista con todos los productos
 * 
 * 
 */

function initList() {
    for (var key in pokeIndex) {
        let listItem = document.createElement("li");
        listItem.setAttribute("class","list-group-item");
        $(listItem).html("#"+key+" - "+pokeIndex[key]);
        $("#listOrigin").append(listItem);
    }
}

/***
 * Ordenar lista productos de manera alfabéticamente
 * 
 * 
 * 
 */

var pokeArray = [];
var pokeAlph = [];
function orderAlph() {
    
    for (var key in pokeIndex){
        pokeArray.push(pokeIndex[key]+"/"+key);
    }
    pokeArray = pokeArray.sort();

    for (var i in pokeArray){
        pokeAlph.push(pokeArray[i].split("/"));
    }

    for (var i = 0, len = pokeArray.length; i < len; i++){
        let listItem = document.createElement("li");
        listItem.setAttribute("class", "list-group-item");
        $(listItem).html("#"+pokeAlph[i][1]+" - "+pokeAlph[i][0]);
        $("#listTarget").append(listItem);
    }
}

/**
 * 
 * Obtiene datos mínimos para la creación de las pokeCards
 * 
 * 
 */

function getPokemons() {
    for (var key in pokeIndex) {
        let url = urlPokeApi+key;
        //console.log(url);
        let request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                var pokeData = JSON.parse(this.response);
                let pokemon = {
                    'name' : pokeData.name,
                    'frontDefault' : pokeData.sprites.front_default,
                    'bigImg' : pokeData.sprites.other["official-artwork"].front_default
                };                
                allPokeData[pokeData.id] = pokemon;
            }
            else {
                console.log("error");
            }
        }
        request.send();
    }
}