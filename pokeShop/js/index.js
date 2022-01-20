$(document).ready(function(){
    getPokemons();
    //console.log(allPokeData);

    initList();

    $("#pokeSearch").on("input", function() {
        $("#candidatos").empty();
        var text = $(this).val();

        var pokemons = findPokemon.getHint(text, "#pokeHint");
        if(Array.isArray(pokemons)){
            console.log(pokemons);
            findPokemon.createSearchInput(pokemons, "#candidatos");
        }
    });
});
