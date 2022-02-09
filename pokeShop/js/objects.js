/***
 *  INDEX
 * 
 *  FindPokemon 
 *  ElementGenerator
 *  ProductViewManager
 * 
 */
const FindPokemon = {
    url: "https://pokeapi.co/api/v2/pokemon-species/",
    pokeArray: [],
    pokeChosen: [],
    pokeFinal: [],
    getHint: function(text, target) {
        let hint = "";
        text = text.toLowerCase();
        for (var key in pokeIndex) {
            let pokemon = pokeIndex[key];
            if (pokemon.includes(text) && text != "") {
                hint += pokeIndex[key] + " ";
                this.pokeArray.push(pokeIndex[key] + "/" + key);
            }
            $(target).removeClass("hidden");
            $(target).html(hint + " ");
        }
        if (this.pokeArray.length < 5 && this.pokeArray.length != 0) {
            $(target).addClass("hidden");
            for (i = 0; i < this.pokeArray.length; i++) {
                this.pokeChosen.push(this.pokeArray[i].split("/"));
            }
            this.pokeFinal = [];
            this.pokeFinal = this.pokeChosen;
        }
        this.pokeArray = [];
        this.pokeChosen = [];
        if (this.pokeFinal.length > 0) {
            return this.pokeFinal;
        }
    },
    createSearchInput: function(pokemons, target) {
        for (var key in pokemons) {

            let previous = document.getElementById("choice");
            console.log(previous);

            if (previous != null) {
                previous.remove()
            }
            ElementGenerator.generate(
                "div", { 'id': 'choice-' + key, 'class': 'searchInput bg-secondary my-1 d-flex align-content-center justify-content-between rounded' },
                target);
            ElementGenerator.generate(
                "p", { 'class': 'text-white mb-0 align-self-center mx-3' },
                "#choice-" + key,
                null,
                '#' + pokemons[key][1] + " - " + pokemons[key][0]);
            // SEARCH BUTTON   function-> searchPokemon(id)
            ElementGenerator.generate(
                "button", {
                    'class': 'btn btn-primary',
                    'value': pokemons[key][1],
                    'onclick': 'searchPokemon(this.value)'
                },
                "#choice-" + key,
                null,
                "search!");
        }
    }
}

const ElementGenerator = {
    /**
     * @param element = Nombre del Elemento : "p" o "div", etcétera
     * @param atributos = assocArray {'tipoAtributo' : 'especificacion'}
     * --> {'class':'col-4 text-dark', 'type' : 'button'}
     * @param target = elemento de destino
     * @param ubicacion = default: append (if Null). Jquery preprend, after & before.
     * @param contenido = String. default: null
     */
    elemento: null,
    generate: function(element, atributos, target, ubicacion = null, contenido = null) {
        this.elemento = this.element(element);
        this.atributos(this.elemento, atributos);
        this.posicionar(this.elemento, target, ubicacion);
        if (typeof(contenido) === 'string') {
            this.contenido(this.elemento, contenido);
        }
    },
    element: function(e) {
        return document.createElement(e);
    },
    atributos: function(element, atributos) {
        for (var key in atributos) {
            element.setAttribute(key, atributos[key]);
        }
    },
    posicionar: function(element, target, ubicacion) {
        switch (ubicacion) {
            case "prepend":
                $(target).prepend(element);
                break;
            case "after":
                $(target).after(element);
                break;
            case "before":
                $(target).before(element);
            default:
                $(target).append(element);
                break;
        }
    },
    contenido: function(element, cont) {
        $(element).html(cont);
    }
}

const ProductViewManager = {
    viewAsList: function(array) {
        for (let key in array) {
            let listItem = makeElement("li");
            setAttributes(listItem, { 'class': 'list-group-item-list' });
            $("#listOrigin").append(listItem);

            let pokeDataContainer = makeElement("div");
            setAttributes(pokeDataContainer, { 'class': 'pokeDataContainerList' });
            listItem.append(pokeDataContainer);

            // CardInfo: h4 título, p valor $$
            let pokeCardInfo = makeElement("div");
            setAttributes(pokeCardInfo, { 'class': 'pokeCardInfoList' });
            pokeDataContainer.append(pokeCardInfo);

            let pokeCardName = makeElement("h4");
            setAttributes(pokeCardName, { 'class': 'pokeCardName' });
            $(pokeCardName).html(capitalize(array[key].name));
            pokeCardInfo.append(pokeCardName);

            let price = makeElement("p");
            $(price).html("$" + array[key].price);
            pokeCardInfo.append(price);

            //Buttons
            let pokeCardButtons = makeElement("div");
            setAttributes(pokeCardButtons, { 'class': 'pokeCardButtons' });
            pokeDataContainer.append(pokeCardButtons);

            let add = makeElement("button");
            setAttributes(add, {
                'class': 'btn btn-secondary',
                'type': 'button',
                'value': array[key].id,
                'onclick': 'addProduct(this.value)'
            });
            $(add).html("Add");
            pokeCardButtons.append(add);

            let see = makeElement("button");
            setAttributes(see, {
                'class': 'btn btn-primary mx-2',
                'type': 'button',
                'value': array[key].id,
                'onclick': 'seeProduct(this.value)'
            });
            $(see).html("See");
            pokeCardButtons.append(see);
        }
    },
    viewAsCard: function(array) {
        for (var key in array) {
            // Main Container li[div.pokeDataContainer][div.pokeImgContainer]
            let listItem = makeElement("li");
            setAttributes(listItem, {
                "class": "list-group-item-card",
            });
            $("#listOrigin").append(listItem);

            let pokeDataContainer = makeElement("div");
            setAttributes(pokeDataContainer, {
                "class": "pokeDataContainerCard",
            });
            $(listItem).append(pokeDataContainer);

            let pokeImgContainer = makeElement("div");
            setAttributes(pokeImgContainer, {
                "class": "pokeImgContainer",
            });
            listItem.append(pokeImgContainer);

            //pokeDataContainer[div.pokeCardInfo[h4.pokeCardName][p]]]
            let pokeCardInfo = makeElement("div");
            setAttributes(pokeCardInfo, {
                "class": "pokeCardInfo",
            });
            $(pokeDataContainer).append(pokeCardInfo);

            let pokeCardName = makeElement("h4");
            setAttributes(pokeCardName, {
                "class": "pokeCardName",
            });
            $(pokeCardName).html(capitalize(array[key].name));
            $(pokeCardInfo).append(pokeCardName);

            let price = makeElement("p");
            $(price).html("$" + array[key].price);
            $(pokeCardInfo).append(price);

            //pokeCardButtons []
            let pokeCardButtons = makeElement("div");
            setAttributes(pokeCardButtons, {
                "class": "pokeCardButtons",
            });
            $(pokeDataContainer).append(pokeCardButtons);

            //addProduct() Button
            let addButton = makeElement("button");
            setAttributes(addButton, {
                "class": "btn btn-secondary",
                "type": "button",
                "value": array[key].id,
                'onclick': 'ShopCart.addProduct(this.value)'
            });
            $(addButton).html("Add");
            $(pokeCardButtons).append(addButton);

            //seeProduct() Button
            let seeButton = makeElement("button");
            setAttributes(seeButton, {
                "class": "btn btn-primary mx-2",
                "type": "button",
                "value": array[key].id,
                "onclick": "seeProduct(this.value)"
            });
            $(seeButton).html("See");
            $(pokeCardButtons).append(seeButton);

            //pokeImgContainer[img]
            let pokeImg = makeElement("img");
            setAttributes(pokeImg, {
                "class": "imageCard",
                "src": array[key].frontDefault,
                "alt": array[key].name,
            });
            $(pokeImgContainer).append(pokeImg);
        }
    }
}
const ShopCart = {
    items: [],
    addProduct: function(id) {
        this.items.push(id);
        sessionStorage.setItem('items', this.items);
        this.showSuccess();
        $("#cartItems").html(this.items.length);
    },
    renderCart: function() {

    },
    totalCompra: function() {
        //subTotal para comenzar la suma
        let subTotal = 0;
        //obtenermos los $$ de cada productValue
        let valores = document.getElementsByClassName("productValue");
        Array.from(valores).forEach(function(item) {
            console.log(item.innerText);
            //Sacamos el $ del valor, sumamos como Float.
            subTotal += parseFloat(item.innerText.substring(1))
        });
        //fijamos el valor en subTotal
        $("#subtotal").html(subTotal);

        let comision = $("#comision").text();
        let total = subTotal + parseFloat(comision);
        $("#total").text(total);
    },
    showSuccess: function() {
        console.log('trigger');
        $("#productAddedAlert").remove();
        ElementGenerator.generate(
            "div", {
                "id": "productAddedAlert",
                "class": "alert alert-success",
                "role": "alert"
            },
            "body",
            null,
            "Product added succesfully"
        );
        $("#productAddedAlert").fadeIn(800).delay(2000).fadeOut(400);
    },
    removeItem: function(e) {
        $(e).removeAttr("onclick");
        $(e).html("Done");
        $(".trashProduct").removeClass('hideMe');
        $(".trashProduct").addClass('showMe');
        $(e).attr("onclick", "ShopCart.closeRemove(this)");
    },
    closeRemove: function(e) {
        $(e).removeAttr("onclick");
        $(e).html("Remove Item");
        $(".trashProduct").removeClass('showMe');
        $(".trashProduct").addClass('hideMe');
        $(e).attr("onclick", "ShopCart.removeItem(this)");
    },
    removeSelectedItem: function(e) {
        //sacamos el número de la id.
        id = e.id.substring(6);
        $('#row-' + id + '.productRow').remove();
        console.log(sessionStorage);
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i] === id) {
                this.items.splice(i, 1);
            }
        }
    }
}