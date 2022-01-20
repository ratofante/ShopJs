/**
 * Index:
 * 
 * initList()
 * 
 * orderAlph()
 * 
 * getPokemons()
 * 
 * setAttributes()
 * 
 * searchPokemon()
 * searchSpecies()
 */


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

function setAttributes(element, attributes) {
    for(var key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function searchPokemon(id) {
    let url = urlPokeApi+id;
    console.log(url);
    let request = new XMLHttpRequest();
    request.open('GET',url,true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var pokeData = JSON.parse(this.response);

            if($(".pokeCard").length > 0){
                $(".pokeCard").remove();
            }
            
            //Armo Card:
            let pokeCard = document.createElement("div");
            pokeCard.setAttribute("class","card pokeCard m-auto");
            $("#pokeCardTarget").append(pokeCard);
            let imgCardContainer = document.createElement("div");
            imgCardContainer.setAttribute("class","imgCardContainer");
            $(".pokeCard").append(imgCardContainer);
            let pokeImg = document.createElement("img");
            setAttributes(pokeImg, {
                "id":"pokeImg",
                "class":"card-img-top",
                "alt":"pokemon"
            });
            $(".imgCardContainer").append(pokeImg);

            let cardBody = document.createElement("div");
            cardBody.setAttribute("class","card-body");
            $(".pokeCard").append(cardBody);

            let title = document.createElement("h4");
            setAttributes(title,{
                "id":"pokeTitle",
                "class":"card-title"
            });
            $(".card-body").append(title);

            let descript = document.createElement("p");
            setAttributes(descript, {
                "id":"pokeDescription",
                "class":"card-text"
            })
            $(".card-body").append(descript);


            $("#pokeTitle").html("#"+id+" - "+pokeData.name);
            $("#pokeImg").attr("src", pokeData.sprites.other["official-artwork"].front_default);
            searchSpecies(id);
        } else {
            console.log("error");
        }
    }
    request.send();
}

function searchSpecies(id) {
    let url = urlPokeSpecies+id;
    let request = new XMLHttpRequest();
    request.open('GET',url,true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            let pokeData = JSON.parse(this.response);
            //Armo description:
            $("#pokeDescription").html(pokeData.flavor_text_entries[0].flavor_text);
        } else {
            console.log("error");
        }
    }
    request.send();
}