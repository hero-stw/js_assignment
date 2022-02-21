export const reRender = async (component, domElement) => {
    if(component){
        document.querySelector(domElement).innerHTML = await component.render();
        if (component.afterRender) component.afterRender();
    }
};
export const countCart = ()=> {
    let cart = [];
    let sumCart = 0;
    if(localStorage.getItem("cart")){
        cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.forEach(item => {
        sumCart += item.quantity;
    });
    return sumCart;
};
export const countTotal = ()=> {
    let cart = [];
    let subtotal = 0;
    if(localStorage.getItem("cart")){
        cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.forEach(item => {
        subtotal += item.quantity * item.price;
    });
    return subtotal;
};