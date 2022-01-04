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

