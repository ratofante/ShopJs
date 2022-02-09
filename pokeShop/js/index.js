$(document).ready(function(){
    
    getPokemons(urlPokeApi, 151);
    const checkPokeDataRdy = setInterval(function() {checkRdy(allPokeData), 500});
    function checkRdy(obj) {
        if(Object.keys(obj).length === 151)
        {
            clearInterval(checkPokeDataRdy);
            ProductViewManager.viewAsCard(allPokeData);
        }
    }

    //Barra 'Buscador'
    $("#pokeSearch").on("input", function() {
        $("#candidatos").empty();
        var text = $(this).val();

        var pokemons = FindPokemon.getHint(text, "#pokeHint");
        if(Array.isArray(pokemons)){
            FindPokemon.createSearchInput(pokemons, "#candidatos");
        }
    });
    if($("#cartItems").html()== ""){
        console.log('vacio')
    } else {console.log('otra cosa')}

});
