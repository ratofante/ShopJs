class Pokedex {
    constructor(id) {
        this.url = "https://pokeapi.co/api/v2/pokemon/" + id;
        

        var request = new XMLHttpRequest();
        request.open('GET', this.url, true);

        request.onload = function() {
            var data = JSON.parse(this.response);

            if(request.status >= 200 && request.status < 400) {
                console.log(data.abilities);
            }
            else {
                console.log("Error");
            }
            
        }
        request.send();
        
        
    }
}

window.onload = new Pokedex(25);
