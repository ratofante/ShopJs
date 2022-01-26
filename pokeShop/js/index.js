$(document).ready(function(){
    getPokemons(urlPokeApi, 151);
    const checkPokeDataRdy = setInterval(function() {checkRdy(allPokeData), 500});
    function checkRdy(obj) {
        if(Object.keys(obj).length === 151)
        {
            clearInterval(checkPokeDataRdy);
            // List / Cards Code here ..
            initList(allPokeData);
        }
    }

    $("#pokeSearch").on("input", function() {
        $("#candidatos").empty();
        var text = $(this).val();

        var pokemons = findPokemon.getHint(text, "#pokeHint");
        if(Array.isArray(pokemons)){
            console.log(pokemons);
            findPokemon.createSearchInput(pokemons, "#candidatos");
            //clearTarget("#candidatos");
        }
    });

    /*
    fetch(urlPokeApi+1)
        .then((resp) => resp.json()) 
        .then(function(resp) {
            //console.log(resp.name);
        })
        .catch(function(error) {
            console.log(error);
    });
    */
});
