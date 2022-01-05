const Pokedex = {
    url : "https://pokeapi.co/api/v2/pokemon-species/",
    pokeArray: [],
    pokeForm: [],
    getHint: function(text, target){
        let hint = "";
        text = text.toLowerCase();
        for(var key in pokeIndex) {
            let pokemon = pokeIndex[key];
            if(pokemon.includes(text) && text != ""){
                hint += pokeIndex[key] + " ";
                this.pokeArray.push(pokeIndex[key]+"/"+key);
            }
            if(this.pokeArray.length < 5 && this.pokeArray.length != 0){
                $(target).addClass("hidden");
                // Acá se llama al constructor de HTML
                this.pokeArray.forEach(this.stripElement());
                console.log(this.pokeForm);
            }
            else {
                $(target).removeClass("hidden");
                $(target).html(hint + " ");
            }
        }
        console.log(this.pokeArray);
        this.pokeArray = [];
    },
    createSearch: function(pokemons) {
        pokemons.forEach(this.stripElement());
    },
    stripElement: function(element) {
        this.pokeForm.push(element.split("/"));
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