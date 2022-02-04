/**
 * Index:
 * 
 * getPokemons()
 * 
 * initList()
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

            pokeMap.set(resp.id, {
                'id':resp.id,
                'name':resp.name,
                'frontDefault':resp.sprites.front_default,
                'bigImg' : resp.sprites.other["official-artwork"].front_default,
            });
        })
        .catch(function(error) {
            console.log(error);
        })
    }
}
/***
 * INIT LIST
 * 
 * Para crear una lista con todos los productos
 * 
 * 
 */
function initList(array) {
    for(var key in array) {
        // Main Container li[div.pokeDataContainer][div.pokeImgContainer]
        let listItem = makeElement("li");
        setAttributes(listItem, {
            "class" : "list-group-item pokeProduct",
        });
        let pokeDataContainer = makeElement("div");
        setAttributes(pokeDataContainer, {
            "class" : "pokeDataContainer",
        });
        $(listItem).append(pokeDataContainer);
        let pokeImgContainer = makeElement("div");
        setAttributes(pokeImgContainer, {
            "class" : "pokeImgContainer",
        });
        listItem.append(pokeImgContainer);

        //pokeDataContainer[div.pokeCardInfo[h4.pokeCardName][p]]]
        let pokeCardInfo = makeElement("div");
        setAttributes(pokeCardInfo, {
            "class" : "pokeCardInfo",
        });
        $(pokeDataContainer).append(pokeCardInfo);
        let pokeCardName = makeElement("h4");
        setAttributes(pokeCardName, {
            "class" : "pokeCardName",
        });
        $(pokeCardName).html(capitalize(array[key].name));
        $(pokeCardInfo).append(pokeCardName);
        let price = makeElement("p");
        $(price).html("$"+array[key].price);
        $(pokeCardInfo).append(price);

        //pokeCardButtons []
        let pokeCardButtons = makeElement("div");
        setAttributes(pokeCardButtons, {
            "class" : "pokeCardButtons",
        });
        $(pokeDataContainer).append(pokeCardButtons);

        /************************************** */
        // ADD button. Function -> addProduct(id)
        /************************************** */
        let addButton = makeElement("button");
        setAttributes(addButton, {
            "class" : "btn btn-secondary",
            "type" : "button",
            "value" : array[key].id,
        });
        $(addButton).html("Add");
        $(pokeCardButtons).append(addButton);

        /************************************** */
        // SEE button. Function -> seeProduct(id)
        /************************************** */
        let seeButton = makeElement("button");
        setAttributes(seeButton, {
            "class" : "btn btn-primary mx-2",
            "type" : "button",
            "value" : array[key].id,
            "onclick" : "seeProduct(this.value)"
        });
        $(seeButton).html("See");
        $(pokeCardButtons).append(seeButton);

        //pokeImgContainer[img]
        let pokeImg = makeElement("img");
        setAttributes(pokeImg, {
            "src" : array[key].frontDefault,
            "alt" : array[key].name,
        });
        $(pokeImgContainer).append(pokeImg);

        // -Finish!
        $("#listOrigin").append(listItem);
    }
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
    .then()

    let url = urlPokeApi+id;
    //console.log(url);
    let request = new XMLHttpRequest();
    request.open('GET',url,true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var pokeData = JSON.parse(this.response);

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
            $("#pokeTitle").html("#"+id+" - "+pokeData.name);
            $("#pokeImg").attr("src", pokeData.sprites.other["official-artwork"].front_default);
            
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
        } else {
            console.log("error");
        }
    }
    request.send();
 }
/**
 * 
 * searchSpecies(id)
 * 
 * 
 */
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



