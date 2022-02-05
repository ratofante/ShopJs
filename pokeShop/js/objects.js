/***
 *  INDEX
 * 
 *  FindPokemon 
 *  ElementGenerator
 * 
 * 
 */


/**
 * FindPokemon
 * --> 
 * 
 * 
 * 
 */
const FindPokemon = {
    url : "https://pokeapi.co/api/v2/pokemon-species/",
    pokeArray: [],
    pokeChosen: [],
    pokeFinal: [],
    getHint: function(text, target){
        let hint = "";
        text = text.toLowerCase();
        for(var key in pokeIndex) {
            let pokemon = pokeIndex[key];
            if(pokemon.includes(text) && text != ""){
                hint += pokeIndex[key] + " ";
                this.pokeArray.push(pokeIndex[key]+"/"+key);
            }
            $(target).removeClass("hidden");
            $(target).html(hint + " "); 
        }      
        if(this.pokeArray.length < 5 && this.pokeArray.length != 0){
            $(target).addClass("hidden");
            for (i=0; i < this.pokeArray.length; i++) {
                this.pokeChosen.push(this.pokeArray[i].split("/"));
            }
            this.pokeFinal = [];
            this.pokeFinal = this.pokeChosen;
        }
        this.pokeArray = [];
        this.pokeChosen = [];
        if(this.pokeFinal.length > 0){
            
            return this.pokeFinal;
        }
    },
    createSearchInput: function(pokemons, target) {
        for(var key in pokemons) {
            
            let previous = document.getElementById("choice");
            console.log(previous);
            
            if(previous != null){
                previous.remove();
            }

            // Creamos la Div 'choice-id'
            let newDiv = makeElement("div");
            setAttributes(newDiv, {
                "id":'choice-'+key,
                "class":'searchInput bg-secondary my-1 d-flex align-content-center justify-content-between rounded'
            });
            $(target).append(newDiv);

            //Creamos el #id - Pokemon <p>
            let newPokemon = document.createElement("p");
            newPokemon.setAttribute('class', 'text-white mb-0 align-self-center mx-3');
            $(newPokemon).html('#'+pokemons[key][1]+" - "+pokemons[key][0]);
            newDiv.appendChild(newPokemon);

            //Creamos el button
            /********************* */
            // SEARCH   function-> searchPokemon(id)
            let button = document.createElement("button");
            setAttributes(button,
                {
                    "class":"btn btn-primary",
                    "value":pokemons[key][1],
                    "onclick":"searchPokemon(this.value)",
                });
            let buttonText = document.createTextNode("search!");
            button.appendChild(buttonText);
            newDiv.appendChild(button);
        }
    }
}


const ElementGenerator = {
    /**
     * @param element = Nombre del Elemento : "p" o "div", etcétera
     * @param atributos = assocArray {'tipoAtributo' : 'especificacion'}
     * --> {'class':'col-4 text-dark', 'type' : 'button'}
     * @param target = elemento de destino
     * @param ubicacion = default: append (if Null). Jquery preprend, after & before.
     * @param contenido = String. default: null
     */
    elemento : null,
    generate: function(element, atributos, target, ubicacion = null, contenido = null) {
        this.elemento = this.element(element);
        this.atributos(this.elemento, atributos);
        this.posicionar(this.elemento, target, ubicacion);
        if(typeof(contenido)==='string'){
            this.contenido(this.elemento,contenido);
        }
    },
    element: function(e) {
        return document.createElement(e);
    },
    atributos: function(element, atributos) {
        for(var key in atributos) {
            element.setAttribute(key, atributos[key]);
        }
    },
    posicionar: function(element, target, ubicacion){
        switch (ubicacion) {
            case "prepend":
                $(target).prepend(element);
                break;
            case "after":
                $(target).after(element);
                break;   
            case "before":
                $(target).before(element);
            default:
                $(target).append(element);
                break;
        }
    },
    contenido : function(element, cont) {
        $(element).html(cont);
    }
}

const ProductViewManager = {


    viewAsList : function(array) {
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
            $(pokeCardName).html(capitalize(array[key].name));
            pokeCardInfo.append(pokeCardName);
    
            let price = makeElement("p");
            $(price).html("$"+array[key].price);
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
}

