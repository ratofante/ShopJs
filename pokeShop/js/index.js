$(document).ready(function() {

    //Sacamos toda la data de pokeApi.
    getPokemons(urlPokeApi, 151);
    const checkPokeDataRdy = setInterval(function() { checkRdy(allPokeData), 500 });

    //establecemos que el intervalo está Rdy cuando allPokeData alcanza length 151.
    function checkRdy(obj) {
        if (Object.keys(obj).length === 151) {
            clearInterval(checkPokeDataRdy);
            ProductViewManager.viewAsCard(allPokeData);
        }
    }

    //Barra 'Buscador', event para cambios en el input.
    $("#pokeSearch").on("input", function() {
        $("#candidatos").empty();
        var text = $(this).val();
        var pokemons = FindPokemon.getHint(text, "#pokeHint");
        console.log(pokemons);
        if (Array.isArray(pokemons)) {
            FindPokemon.createSearchInput(pokemons, "#candidatos");
        }
    });

    //Chequeamos que coincida Storage con items en el carrito
    ShopCart.checkCartStorageCount();
});