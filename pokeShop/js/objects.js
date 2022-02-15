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
        //seteamos variables
        this.pokeChosen = [];
        this.pokeArray = [];
        let hint = "";
        text = text.toLowerCase();
        for (var key in pokeIndex) {
            let pokemon = pokeIndex[key];
            //si hay coincidencias, agregar el nombre a hint con un espacio " "
            if (pokemon.includes(text) && text != "") {
                hint += pokeIndex[key] + " ";
                this.pokeArray.push(pokeIndex[key] + "/" + key);
            }
            //Pasamos HINT como text al target ('#pokeHint')
            $(target).text(hint + " ");
        }
        //si el array tiene entre 4 y 1 candidatos
        if (this.pokeArray.length < 5 && this.pokeArray.length != 0) {
            //Armamos el array con los 1 a 4 candidatos.
            for (i = 0; i < this.pokeArray.length; i++) {
                this.pokeChosen.push(this.pokeArray[i].split("/"));
            }
            /*console.log(this.pokeChosen);
            this.pokeFinal = [];
            this.pokeFinal = this.pokeChosen;
            console.log(this.pokeFinal);
            console.log(this.pokeChosen);*/
        }
        console.log(this.pokeChosen);
        // hay resultados > 0 y < 5
        if (this.pokeChosen.length > 0) {
            if ($(target).hasClass('showMe')) { $(target).removeClass('showMe') }
            $(target).addClass('hideMe');
            return this.pokeChosen;
        } else if (hint === "" & $('#pokeHint').hasClass('showMe')) {
            $(target).removeClass('showMe');
            $(target).addClass('hideMe');
            if ($('#candidatos').hasClass('showMe')) {
                $('#candidatos').removeClass('showMe')
                $('#candidatos').addClass('hideMe');
            }
        } else if (hint != "") {
            if ($(target).hasClass('hideMe')) { $(target).removeClass('hideMe') }
            $(target).addClass('showMe')
            if ($('#candidatos').hasClass('showMe')) {
                console.log('si');
                $('#candidatos').removeClass('showMe')
                $('#candidatos').addClass('hideMe');
            }
        }
    },
    createSearchInput: function(pokemons, target) {
        $("#candidatos").removeClass("hideMe");
        $("#candidatos").addClass('showMe');
        for (var key in pokemons) {
            console.log('trigger');
            ElementGenerator.generate(
                "div", { 'id': 'choice-' + key, 'class': 'searchInput bg-secondary my-1 d-flex align-content-center justify-content-between rounded' },
                target);
            ElementGenerator.generate(
                "p", { 'class': 'text-white mb-0 align-self-center mx-3' },
                "#choice-" + key,
                null,
                '#' + pokemons[key][1] + " - " + capitalize(pokemons[key][0]));
            // SEARCH BUTTON   function-> searchPokemon(id)
            ElementGenerator.generate(
                "button", {
                    'class': 'btn btn-primary searchButton',
                    'value': pokemons[key][1],
                    'onclick': 'searchPokemon(this.value); FindPokemon.clearCandidatos()'
                },
                "#choice-" + key,
                null,
                "search!");
        }
    },
    clearCandidatos: () => {
        $('#candidatos').empty();
        $('#candidatos').removeClass('showMe');
        $('#candidatos').addClass('hideMe');
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
        $("#listOrigin").empty();
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
                'class': 'btn btn-secondary addButton',
                'type': 'button',
                'value': array[key].id,
                'onclick': 'ShopCart.addProduct(this, this.value)'
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
        ShopCart.checkAlreadySelectedItems();
    },
    viewAsCard: function(array) {
        $("#listOrigin").empty();
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
                "class": "btn btn-secondary addButton",
                "type": "button",
                "value": array[key].id,
                'onclick': 'ShopCart.addProduct(this, this.value)'
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
    addProduct: function(e, id) {


        //obtenemos lo que haya en el storage.
        let previous = sessionStorage.getItem('items');

        function addAndSet(id, array) {
            array.push(id);
            sessionStorage.setItem('items', array);
        }
        switch (previous) {
            case null:
                //Si no hay nada, agregamos producto al storage
                addAndSet(id, this.items);
                break;
            case '':
                //cuando no hay nada, a veces queda como empty string.
                sessionStorage.removeItem('items');
                addAndSet(id, this.items);
                break;
            default:
                //si hay algo, lo totamos aquí, insertamos nuevo objeto y
                //actualizamos el storage.
                this.items = sessionStorage.getItem('items').split(",");
                addAndSet(id, this.items);
                break;
        }
        //mostramos mensaje éxito al finalizar.*/
        this.showSuccess();
        //modificamos el carrito con el n° de items en Storage.
        $("#cartItems").text(this.items.length);

        //cambiamos el display del button para deshabilitarlo y 'Added'
        setAttributes(e, {
            'style': 'pointer-events:none',
            'class': 'btn btn-disabled addButton'
        });
        $(e).text('Added');

        //chequeamos por si es botón de la Vista de un producto.
        //Así nos aseguramos de también cambiar el botón de view list/card. 
        ShopCart.checkAlreadySelectedItems();
    },
    checkCartStorageCount: function() {
        if (sessionStorage.getItem('items') === null || sessionStorage.getItem('items') === '') {
            // Si Storage vacío, vaciar indicador de items en el carro.
            $("#cartItems").empty();
            return false;
        } else if (sessionStorage.getItem('items') != '') {
            this.items = sessionStorage.getItem('items').split(",");
            //asignamos cantidad de items al carrito.
            $("#cartItems").text(this.items.length);
            return true;
        }
    },
    totalCompra: function() {
        //subTotal para comenzar la suma
        let subTotal = 0;
        //obtenermos los $$ de cada productValue
        let valores = document.getElementsByClassName("productValue");
        Array.from(valores).forEach(function(item) {
            //Sacamos el $ del valor, sumamos como Float.
            subTotal += parseFloat(item.innerText.substring(1))
        });
        //fijamos el valor en subTotal
        $("#subtotal").html(subTotal.toFixed(2));
        //sacamos el valor de la comision
        let comision = $("#comision").text();
        //calculamos total de la compra
        let total = subTotal + parseFloat(comision);
        //asignamos total respectivamente. 
        $("#total").text(total.toFixed(2));
    },
    showSuccess: function() {
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
    checkCloseRemove: function() {
        if ($('#removeButton').attr('onclick') === 'ShopCart.closeRemove(this)') {
            $('#removeButton').removeAttr('onclick');
            $('#removeButton').attr('onclick', 'ShopCart.removeItem(this)');
            $('#removeButton').text('Remove Item');
        }
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
        console.log(e);
        //sacamos el número de la id.
        id = e.id.substring(6);
        console.log(`valor de id: ${id}`);
        let n = parseInt(id) - 1;
        console.log(`valor de n: ${n}`);
        // re-habilitamos el addButton.
        let buttons = $('.btn-disabled');
        console.log(`valor de buttons:`);
        console.log(buttons);

        // n tiene que ser igual al value
        for (var key in buttons) {
            if (buttons[key].value == id) {
                setAttributes(buttons[key], {
                    'class': 'btn btn-secondary',
                    'type': 'button',
                    'value': id,
                    'onclick': 'ShopCart.addProduct(this, this.value)',
                    'style': 'pointer-events:auto'
                });
                $(buttons[key]).text('Add');
            }
        }
        $('#row-' + id + '.productRow').remove();
        //Recorremos items buscando el producto con su ID y lo borramos.
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i] === id) {
                this.items.splice(i, 1);
                console.log(this.items);
            }
        }
        //cargamos items nuevamente en sessionStorage
        sessionStorage.setItem('items', this.items);

        //rendereamos nuevamente la view de los productos del Cart.
        this.renderCart();
        //mostramos nuevamente los basureros
        $(".trashProduct").removeClass('hideMe');
        $(".trashProduct").addClass('showMe');
        //calculamos total compra!
        this.totalCompra();

        sessionStorage.getItem('items') === undefined ? this.renderCart() : $("#cartItems").html(this.items.length);
    },
    checkAlreadySelectedItems() {
        if (sessionStorage.getItem('items') != null && sessionStorage.getItem('items') !== '') {
            let previous = sessionStorage.getItem('items');
            let buttons = $('.addButton');
            console.log(previous);
            if (previous.length > 1) {
                previous = sessionStorage.getItem('items').split(",");
                console.log(previous);

                previous.forEach(item => {
                    let i = parseInt(item) - 1;
                    setAttributes(buttons[i], {
                        'style': 'pointer-events:none',
                        'class': 'btn btn-disabled addButton'
                    });
                    $(buttons[i]).text('Added');
                })
            }
            let i = parseInt(previous) - 1;
            setAttributes(buttons[i], {
                'style': 'pointer-events:none',
                'class': 'btn btn-disabled addButton'
            });
            $(buttons[i]).text('Added');
        }
    },
    renderCart: function() {
        //limpiamos el carrito
        $('#productContainer').empty();
        if (sessionStorage.getItem('items') === '' || sessionStorage.getItem('items') === null) {

            ElementGenerator.generate(
                "h6", {
                    'id': 'noItemsInCart',
                    'class': 'text-center'
                },
                '#productContainer',
                null,
                "Your cart is empty. Search one or more products that you like"
            );
            return;
        }
        let items = sessionStorage.getItem('items').split(",");
        console.log(items);
        // El problema es que necesito que item coincida con allPokedata[i].id
        // Y no simplemente con allPokeData[item] ..

        items.forEach(function(item) {
            const pokemon = {};
            for (var key in allPokeData) {
                if (allPokeData[key].id == item) {
                    pokemon['id'] = allPokeData[key].id;
                    pokemon['frontDefault'] = allPokeData[key].frontDefault;
                    pokemon['nombre'] = allPokeData[key].name;
                    pokemon['price'] = allPokeData[key].price;
                }
            }
            console.log(pokemon);

            /*let id = allPokeData[key].id;
                        let frontDefault = allPokeData[key].frontDefault;
                        let name = allPokeData[key].name;
                        let price = allPokeData[key].price;
            console.log(`${id},${frontDefault},${name},${price}`);*/
            ElementGenerator.generate(
                "div", {
                    'id': 'row-' + pokemon.id,
                    'class': 'productRow',
                },
                '#productContainer'
            );
            ElementGenerator.generate(
                "img", {
                    'class': 'productImg',
                    'src': pokemon.frontDefault,
                    'alt': pokemon.nombre
                },
                '#row-' + pokemon.id
            );
            ElementGenerator.generate(
                "h4", {
                    'class': 'productName'
                },
                '#row-' + pokemon.id,
                null,
                pokemon.nombre
            );
            ElementGenerator.generate(
                "a", {
                    'id': 'trash-' + pokemon.id,
                    'type': 'button',
                    'class': 'trashProduct hideMe',
                    'onclick': 'ShopCart.removeSelectedItem(this)'
                },
                '#row-' + pokemon.id
            );
            //insertamos en <a></a> el SVG para el tacho de basura (en consts.js)
            $('#trash-' + pokemon.id).append(svgTachoBasura);
            ElementGenerator.generate(
                "span", {
                    'class': 'productValue'
                },
                '#row-' + pokemon.id,
                null,
                "$" + pokemon.price
            );
        });
        //Sacamos total
        this.totalCompra();
    }
}
const Ordenador = {
    estado: 'card',
    sort: '',
    viewAsList: function() {
        if (this.estado.includes('list') === false) {
            $("#listOrigin").empty();
            ProductViewManager.viewAsList(allPokeData);
            this.toogleCardListView('#viewList', '#viewCard');
            this.estado = 'list';
            ShopCart.checkAlreadySelectedItems();
        }
    },
    viewAsCard: function() {
        if (this.estado.includes('card') === false) {
            $("#listOrigin").empty();
            ProductViewManager.viewAsCard(allPokeData);
            this.toogleCardListView('#viewCard', '#viewList');
            this.estado = 'card';
            ShopCart.checkAlreadySelectedItems();
        }
    },
    toogleCardListView: function(actual, past) {
        $(actual).addClass('bg-info');
        $(past).removeClass('bg-info');
        $(actual).attr('style', 'pointer-events:none');
        $(past).removeAttr('style');
    },
    sortAlph: function(e) {
        if (this.sort.includes('alph') === false) {
            //reordenamos allPokeData alfabéticamente.
            allPokeData.sort((a, b) => (a.name > b.name) ? 1 : -1);
            //redereamos productos de acuerdo a view 'card' o 'list'
            this.estado === 'card' ? ProductViewManager.viewAsCard(allPokeData) : ProductViewManager.viewAsList(allPokeData);
            //seteamos botón 'alphabetically' con bg-info y quitamos pointer.
            $(e).addClass('bg-info');
            $(e).attr('style', 'pointer-events:none');
            //chequeamos si ya se activó para ver precios
            if (this.sort.includes('pr-')) {
                //desmarcamos botón precio
                $("#viewPrice").removeClass('bg-info');
                if (this.sort.includes('high')) {
                    //desmarcamos 'high' de estar marcado como opción
                    $("#priceHigh").removeClass('bg-info');
                    $("#priceHigh").removeAttr('style');
                } else {
                    //desmarcamos 'low' caso de estar marcado. 
                    $("#priceLow").removeClass('bg-info');
                    $("#priceLow").removeAttr('style');
                }
            }
            //seteamos sort para alfabético. 
            this.sort = 'alph';
        }
    },
    sortPrice: function(e) {
        //Si está seteado 'alph' lo desmarcamos (fondo celeste).
        if (this.sort.includes('alph') === true) {
            $("#viewAlph").removeClass('bg-info');
            $("#viewAlph").removeAttr('style');
        }
        //Para botón ver precios mayor a menos (high)
        if (e.id === 'priceHigh') {
            if (this.sort.includes('high') === false) {
                //Si estaba marcado 'low', desmarcamos.
                if (this.sort.includes('low') === true) {
                    $("#priceLow").removeAttr('style');
                    $("#priceLow").removeClass('bg-info');
                }
                //reordenamos allPokeData y rendereamos de acuerdo a si la view
                //es 'card' o 'list'.
                allPokeData.sort((a, b) => (a.price < b.price) ? 1 : -1);
                this.estado.includes('card') === true ? ProductViewManager.viewAsCard(allPokeData) : ProductViewManager.viewAsList(allPokeData);
                //Por último, seteamos sort con el valor correspondiente.
                this.sort = 'pr-high';
            }
        } else {
            //Para botón ver precios menor a mayor (low)
            if (this.sort.includes('low') === false) {
                //Si estaba marcado 'high' lo desmarcamos.
                if (this.sort.includes('high') === true) {
                    $("#priceHigh").removeAttr('style');
                    $("#priceHigh").removeClass('bg-info');
                }
                //reordenamos allPokeData y redereamos de acuerdo a si la view
                //es 'card' o 'list'
                allPokeData.sort((a, b) => (a.price > b.price) ? 1 : -1);
                this.estado.includes('card') === true ? ProductViewManager.viewAsCard(allPokeData) : ProductViewManager.viewAsList(allPokeData);
                //seteamos sort con el valor correspondiente.
                this.sort = 'pr-low';
            }
        }
        //el Elemento que dispara la función pasa a estar marcado. 
        $(e).attr('style', 'pointer-events:none');
        $(e).addClass('bg-info');
        //marcamos también la sección 'Price'
        $("#viewPrice").addClass('bg-info');
    }


}