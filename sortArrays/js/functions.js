window.onload = function() {
    initList();
}
function initList() {
    for (var key in pokeIndex) {
        let listItem = document.createElement("li");
        listItem.setAttribute("class","list-group-item");
        $(listItem).html("#"+key+" - "+pokeIndex[key]);
        $("#listOrigin").append(listItem);
    }
}
var pokeArray = [];
var pokeAlph = [];
function orderAlph() {
    
    for (var key in pokeIndex){
        pokeArray.push(pokeIndex[key]+"/"+key);
    }
    pokeArray = pokeArray.sort();

    for (var i in pokeArray){
        pokeAlph.push(pokeArray[i].split("/"));
    }

    for (var i = 0, len = pokeArray.length; i < len; i++){
        let listItem = document.createElement("li");
        listItem.setAttribute("class", "list-group-item");
        $(listItem).html("#"+pokeAlph[i][1]+" - "+pokeAlph[i][0]);
        $("#listTarget").append(listItem);
    }
}