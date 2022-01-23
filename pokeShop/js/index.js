$(document).ready(function(){

    getPokemons(urlPokeApi, 151);
    const checkPokeMapRdy = setInterval(function() {checkRdy(pokeMap), 500});
    
    function checkRdy(arr) {
        if(arr.size === 151)
        {
            stopCheckRdy();
            console.log(allPokeData);
            console.log(pokeMap);
            //console.log(allPokeData[25]);
            //console.log(pokeMap.get(25));

            // List / Cards Code here ..
            initList(allPokeData);

        }
    }
    function stopCheckRdy() {clearInterval(checkPokeMapRdy)}

    initList();

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
