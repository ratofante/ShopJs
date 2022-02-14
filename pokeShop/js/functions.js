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
    for (var i = 1; i < num + 1; i++) {
        fetch(url + i)
            .then((resp) => resp.json())
            .then(function(resp) {
                let pokemon = {
                    'id': resp.id,
                    'name': resp.name,
                    'frontDefault': resp.sprites.front_default,
                    'bigImg': resp.sprites.other["official-artwork"].front_default,
                    'price': (Math.random() * (9.99 - 1.99) + 1.99).toFixed(2),
                };
                allPokeData[resp.id] = pokemon;
            })
            .catch(function(error) {
                console.log(error);
            })
    }
}
/**
 * 
 * searchPokemon(id)
 * 
 *  
 */
function searchPokemon(id) {
    fetch(urlPokeApi + id)
        .then((resp) => resp.json())
        .then(function(resp) {
            $('#cardInfo').empty();
            $('#pokeCardTarget').empty();

            if ($(".pokeCard").length > 0) {
                $(".pokeCard").remove();
            }
            //Armo Card con IMG, id-nombre y flavortext:
            ElementGenerator.generate(
                "div", { "class": "card pokeCard m-auto" },
                "#pokeCardTarget"
            );
            ElementGenerator.generate(
                "div", { 'class': 'imgCardContainer' },
                ".pokeCard"
            );
            //IMG
            ElementGenerator.generate(
                "img", {
                    'id': 'pokeImg',
                    'class': 'card-img-top',
                    'alt': 'pokemon',
                    'src': resp.sprites.other["official-artwork"].front_default
                },
                ".imgCardContainer"
            );
            ElementGenerator.generate(
                "div", { 'class': 'card-body' },
                ".pokeCard"
            );
            // #ID - NAME
            ElementGenerator.generate(
                "h4", { 'id': 'pokeTitle', 'class': 'card-title' },
                ".card-body",
                null,
                "#" + id + " - " + capitalize(resp.name)
            );
            ElementGenerator.generate(
                "p", { 'id': 'pokeDescription', 'class': 'card-text' },
                ".card-body"
            );
            //Type Div
            ElementGenerator.generate(
                "div", { 'class': 'infoBlock typeBlock' },
                '#cardInfo'
            );
            //Type
            let types = '';
            for (var key in resp.types) {
                types += capitalize(resp.types[key].type.name) + ' - ';
            }
            types = types.substring(0, types.length - 2);
            ElementGenerator.generate(
                'h5', { 'class': 'infoTitle' },
                '.typeBlock',
                null,
                'Type :'
            );
            ElementGenerator.generate(
                'span', { 'class': 'pokeInfoText' },
                '.typeBlock',
                null,
                types
            );
            // SEARCH SPECIES
            // flavor_text, evoluciones, habitat y shape.
            searchSpeciesData(id);

            $(".productInfo").removeClass("hideMe");
            $(".productInfo").addClass("showMe");


            $.scrollTo('html', {
                duration: 500,
                offset: { top: 242 },
            })
        })
        .catch(function(error) {
            console.log(error);
        })
}
/**
 * 
 * searchSpecies(id)
 * 
 * 
 */
function searchSpeciesData(id) {
    fetch(urlPokeSpecies + id)
        .then((resp) => resp.json())
        .then(function(resp) {
            //flavor_text, usamos la versión sapphire y lenguaje english
            let foo = resp.flavor_text_entries
            for (let key in foo) {
                if (foo[key].version.name === 'sapphire' && foo[key].language.name === 'en') {
                    $('#pokeDescription').text(foo[key].flavor_text);
                }
            }
            // habitat div
            ElementGenerator.generate(
                'div', { 'class': 'infoBlock habitatBlock' },
                '#cardInfo'
            )
            ElementGenerator.generate(
                'h5', { 'class': 'infoTitle' },
                '.habitatBlock', null, 'Habitat :'
            );
            // habitat 
            ElementGenerator.generate(
                'span', { 'class': 'pokeInfoText' },
                '.habitatBlock', null, capitalize(resp.habitat.name)
            );
            //shape Div
            ElementGenerator.generate(
                'div', { 'class': 'infoBlock shapeBlock' },
                '#cardInfo'
            );
            ElementGenerator.generate(
                'h5', { 'class': 'infoTitle' },
                '.shapeBlock', null, 'Shape :'
            );
            // shape
            ElementGenerator.generate(
                'span', { 'class': 'pokeInfoText' },
                '.shapeBlock', null, capitalize(resp.shape.name)
            );
            // evo chain
            fetch(resp.evolution_chain.url)
                .then((resp) => resp.json())
                .then((resp) => {
                    //necesito extraer la ID a partir de la url de la specie.
                    function giveId(url) {
                        let str = url;
                        str = str.substring(resp.chain.species.url.indexOf("species/"));
                        str = str.substring('species/'.length);
                        evoId = str.substring(0, str.length - 1);
                        return evoId;
                    }
                    ElementGenerator.generate(
                        'h5', { 'class': 'infoTitle evoChainTitle' },
                        '#cardInfo', null, 'Evolution Chain :'
                    );
                    ElementGenerator.generate(
                        'div', { 'class': 'infoBlock evoBlock' }, '#cardInfo'
                    );
                    if (resp.chain.evolves_to.length > 1) {
                        // casos raros. EEVEE.
                        let evos = {};
                        evos[giveId(resp.chain.species.url)] = resp.chain.species.name;
                        evos[giveId(resp.chain.evolves_to[0].species.url)] = resp.chain.evolves_to[0].species.name;
                        evos[giveId(resp.chain.evolves_to[1].species.url)] = resp.chain.evolves_to[2].species.name;
                        evos[giveId(resp.chain.evolves_to[2].species.url)] = resp.chain.evolves_to[2].species.name;
                        fetchEvos(evos);
                    } else if (resp.chain.evolves_to.length === 0) {
                        ElementGenerator.generate(
                            //Tiene solo una evo
                            'div', { 'class': 'evoDiv' }, '.evoBlock', null,
                            `<span>This pokémon does not have an evolution</span>`
                        )
                    } else if (resp.chain.evolves_to[0].evolves_to.length === 1) {
                        //tiene 3 evos
                        let evos = {};
                        evos[giveId(resp.chain.species.url)] = resp.chain.species.name;
                        evos[giveId(resp.chain.evolves_to[0].species.url)] = resp.chain.evolves_to[0].species.name;
                        evos[giveId(resp.chain.evolves_to[0].evolves_to[0].species.url)] = resp.chain.evolves_to[0].evolves_to[0].species.name;
                        fetchEvos(evos);
                    } else {
                        //tiene 2 evos
                        let evos = {};
                        evos[giveId(resp.chain.species.url)] = resp.chain.species.name;
                        evos[giveId(resp.chain.evolves_to[0].species.url)] = resp.chain.evolves_to[0].species.name;
                        fetchEvos(evos);
                    }
                    //Por último, generamos los botones.
                    //Generamos botones
                    ElementGenerator.generate(
                        'div', { class: 'pokeCardButtons buyDisplayProduct' }, '#cardInfo',
                        null,
                    );
                    ElementGenerator.generate(
                        'button', {
                            'id': 'presentProductButton',
                            'class': 'btn btn-secondary addButton',
                            'type': 'button',
                            'value': id,
                            'onclick': 'ShopCart.addProduct(this, this.value)'
                        },
                        '.buyDisplayProduct',
                        null,
                        'Buy Product'
                    );
                    ShopCart.checkAlreadySelectedItems();
                })
                .catch((error) =>
                    console.log(error)
                );
        })
        .catch(function(error) {
            console.log(error)
        });
}
// Habiendo armado el array con {id : name}, armamos html.
function fetchEvos(evos) {
    for (var i in evos) {
        let id = i;
        fetch(urlPokeApi + id).then((resp) => resp.json())
            .then((resp) => {
                let img = resp.sprites.front_default;
                ElementGenerator.generate(
                    'div', { 'class': 'evoDiv' }, '.evoBlock', null,
                    `<img class='evoChainImg' src="${img}" alt="${capitalize(evos[id])}">
                    <span class="evoName">${capitalize(evos[id])}</span>`
                );
            })
            .catch((error) => console.log(error));
    }
}
/**
 * 
 * seeProduct(id)
 * 
 * 
 */
function seeProduct(id) {
    if ($(".productInfo").hasClass("showMe")) {
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
    for (var key in attributes) {
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
    let capStr = string.slice(0, 1);
    let restStr = string.slice(1);
    return capStr.toUpperCase() + restStr;
}

function clearTargetChilds(target) {
    $(target).empty();
}

function clearInputContent(target) {
    $(target).val('');
}