const findPokemon = {
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
            this.pokeFinal.length > 0 ? this.pokeFinal = [] : this.pokeFinal = this.pokeChosen;
        }
        this.pokeArray = [];
        this.pokeChosen = [];
        if(this.pokeFinal.length > 0){
            return this.pokeFinal;
        }
    },
    createSearchInput: function(pokemons, target) {
        for(var key in pokemons) {
            let previous = document.getElementById("choice-"+key);
            console.log(previous);
            
            if(previous != null){
                previous.remove();
            }

            // Creamos la Div 'choice-id'
            let newDiv = document.createElement("div");
            newDiv.setAttribute('id','choice-'+key);
            newDiv.setAttribute('class','bg-secondary my-1 d-flex align-content-center justify-content-between rounded');
            $(target).append(newDiv);

            //Creamos el #id - Pokemon <p>
            let newPokemon = document.createElement("p");
            newPokemon.setAttribute('class', 'text-white mb-0 align-self-center mx-3');
            let pokemonName = document.createTextNode('#'+pokemons[key][1]+" - "+pokemons[key][0]);
            newPokemon.append(pokemonName);
            newDiv.appendChild(newPokemon);

            //Creamos el button
            let button = document.createElement("button");
            button.setAttribute('class', "btn btn-primary");
            button.setAttribute('value',pokemons[key][1]);
            let buttonText = document.createTextNode("search!");
            button.appendChild(buttonText);
            newDiv.appendChild(button);
        }
    }
}

/*
class Pokedex {
    constructor(id) {
        this.url = "https://pokeapi.co/api/v2/pokemon-species/" + id;
        this.data = {};
        
        var request = new XMLHttpRequest();
        request.open('GET', this.url, true);

        request.onload = function() {
            this.data = JSON.parse(this.response);

            if(request.status >= 200 && request.status < 400) {
                console.log("éxito");
            }
            else {
                console.log("Error");
            }
            
        }
        request.send();
    }
    getName() {
        return this.name;
    }   
}


window.onload = function() {
    let pokemon = new Pokedex(25);
    console.log(pokemon.getName());
}

*/