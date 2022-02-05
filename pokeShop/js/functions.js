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






/***
 * INIT CARD LIST
 * 
 * Para renderizar allPokeData en formato Card.
 * param = allPokeData  // Desde getPokemons()
 * 
 */
function initCardList(array) {
    for(var key in array) {
        // Main Container li[div.pokeDataContainer][div.pokeImgContainer]
        let listItem = makeElement("li");
        setAttributes(listItem, {
            "class" : "list-group-item pokeProduct",
        });
        $("#listOrigin").append(listItem);

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
            'onclick':'addProduct(this.value)'
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
    }
}
/*
 * initListList 
 * 
 *  Para renderizar allPokeData como Lista.
 *  param = allPokeData  // Desde getPokemons()
 * 
 */
function initListList(array) {
    for (let key in array) {
        let listItem = makeElement("li");
        setAttributes(listItem, {'class': 'list-group-item pokeProduct'});
        $("#listOrigin").append(listItem);

        let pokeDataContainer = makeElement("div");
        setAttributes(pokeDataContainer, {'class':'pokeDataContainer'});
        listItem.append(pokeDataContainer);

        // CardInfo: h4 título, p valor $$
        let pokeCardInfo = makeElement("div");
        setAttributes(pokeCardInfo, {'class':'pokeCardInfo'});
        pokeDataContainer.append(pokeCardInfo);

        let pokeCardName = makeElement("h4");
        setAttributes(pokeCardName,{'class':'pokeCardName'});
        pokeCardName.html(capitalize(array[key].name));
        pokeCardInfo.append(pokeCardName);

        let price = makeElement("p");
        price.html("$"+array[key].price);
        pokeCardInfo.append(price);

        //Buttons
        let pokeCardButtons = makeElement("div");
        setAttributes(pokeCardButtons, {'class':'pokeCardButtons'});
        pokeDataContainer.append(pokeCardButtons);

        let add = makeElement("button");
        setAttributes(add, {
            'class':'btn btn-secondary',
            'type':'button',
            'value':array[key].id,
            'onclick':'addProduct(this.value)'
        });
        pokeCardButtons.append(add);

        let see = makeElement("button");
        setAttributes(see, {
            'class':'btn btn-primary',
            'type':'button',
            'value':array[key].id,
            'onclick':'seeProduct(this.value)'
        });
        pokeCardButtons.append(see);
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



