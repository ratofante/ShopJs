/**
 * Index:
 * 
 * getPokemons()
 * 
 * initCardList()
 * 
 * searchPokemon()
 * 
 * searchSpecies()
 * 
 * UTILITIES
 * 
 * setAttributes()
 * makeElement()
 * capitalize()
 * clearTargetChilds()
 * clearTargetContent() 
 *
 */

/**
 * GETPOKEMONS
 * 
 * Obtiene datos mínimos para la creación de las pokeCards
 * Actualmente lo tengo disponible para pokeMap y allPokeData
 * 
 * Const: 
 * Usa allPokeData
 * Usa pokeMap
 */
 function getPokemons(url, num) {
    for (var i = 1; i < num+1; i++){
        fetch(url+i)
        .then((resp) => resp.json())
        .then(function(resp) {
            let pokemon = {
                'id' : resp.id,
                'name' : resp.name,
                'frontDefault' : resp.sprites.front_default,
                'bigImg' : resp.sprites.other["official-artwork"].front_default,
                'price' : (Math.random() * (9.99 - 1.99) + 1.99).toFixed(2),
            };
            allPokeData[resp.id] = pokemon;

            /*pokeMap.set(resp.id, {
                'id':resp.id,
                'name':resp.name,
                'frontDefault':resp.sprites.front_default,
                'bigImg' : resp.sprites.other["official-artwork"].front_default,
            });*/
        })
        .catch(function(error) {
            console.log(error);
        })
    }
}
function viewAsList() {
    $("#listOrigin").empty();
    ProductViewManager.viewAsList(allPokeData);
}
function viewAsCard() {
    $("#listOrigin").empty();
    ProductViewManager.viewAsCard(allPokeData);
}
/**
 * 
 * searchPokemon(id)
 * 
 *  
 */
 function searchPokemon(id) {
    fetch(urlPokeApi+id)
    .then((resp) => resp.json())
    .then(function(resp){
        if($(".pokeCard").length > 0){
            $(".pokeCard").remove();
        }
        //Armo Card:
        ElementGenerator.generate(
            "div",
            {"class":"card pokeCard m-auto"},
            "#pokeCardTarget"
        );
        ElementGenerator.generate(
            "div",
            {'class':'imgCardContainer'},
            ".pokeCard"
        );
        ElementGenerator.generate(
            "img",
            {'id':'pokeImg','class':'card-img-top','alt':'pokemon'},
            ".imgCardContainer"
        );
        ElementGenerator.generate(
            "div",
            {'class':'card-body'},
            ".pokeCard"
        );
        ElementGenerator.generate(
            "h4",
            {'id':'pokeTitle','class':'card-title'},
            ".card-body",
            null,
        );
        ElementGenerator.generate(
            "p",
            {'id':'pokeDescription', 'class':'card-text'},
            ".card-body"
        );
        $("#pokeTitle").html("#"+id+" - "+resp.name);
        $("#pokeImg").attr("src", resp.sprites.other["official-artwork"].front_default);
        
        // SEARCH SPECIES
        searchSpecies(id);

        $(".productInfo").removeClass("hideMe");
        $(".productInfo").addClass("showMe");

        clearTargetChilds("#candidatos");
        clearTargetChilds("#pokeHint");
        clearInputContent("#pokeSearch");

        $.scrollTo('html',{
            duration: 500,
            offset: {top:242},
        })
    })
    .catch(function(error){
        console.log(error);
    })
}
/**
 * 
 * searchSpecies(id)
 * 
 * 
 */
function searchSpecies(id) {
    fetch(urlPokeSpecies+id)
    .then((resp) => resp.json())
    .then(function(resp) {
        $("#pokeDescription").html(resp.flavor_text_entries[0].flavor_text);
    })
    .catch(function(error){
        console.log(error)
    });
}
/**
 * 
 * seeProduct(id)
 * 
 * 
 */
function seeProduct(id) {
    console.log(id);
    console.log($(".productInfo").hasClass("showMe"));
    if($(".productInfo").hasClass("showMe")){
        $(".productInfo").removeClass("showMe");
        $(".productInfo").addClass("hideMe");
    }
    $("#pokeCardTarget").empty();
    searchPokemon(id);
}
/**
 * 
 * UTILITIES
 * 
 *  
 */
function setAttributes(element, attributes) {
    for(var key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}
function makeElement(name) {
    return document.createElement(name);
}
function append(parent, element) {
    return parent.appendChild(element);
}
function capitalize(string) {
    let capStr = string.slice(0,1);
    let restStr = string.slice(1);
    return capStr.toUpperCase()+restStr;
}
function clearTargetChilds(target) {
    $(target).empty();
}
function clearInputContent(target) {
    $(target).val('');
}



