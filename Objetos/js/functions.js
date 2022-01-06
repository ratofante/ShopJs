function setAttributes(element, attributes) {
    for(var key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}