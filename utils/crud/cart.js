
let cart = [];
if(localStorage.getItem('cart')){
    cart = JSON.parse(localStorage.getItem('cart'));
}

export const addToCart = (newProduct, next) => {
    const existProduct = cart.find(item => item.id === newProduct.id);
    if(!existProduct){
        cart.push(newProduct)
    } else {
        existProduct.quantity += newProduct.quantity;
    }
    localStorage.setItem('cart', JSON.stringify(cart));

    next();
}
export const increaseQuantity = (id, next) => {
    cart.find(item => item.id == id).quantity++;
    localStorage.setItem('cart', JSON.stringify(cart))
    next();
}
export const decreaseQuantity = (id, next) => {
    const currentProduct = cart.find(item => item.id == id);
    currentProduct.quantity--;
    console.log(currentProduct.quantity);
    if(currentProduct.quantity < 1){
        const confirm = window.confirm("You want to delete this item?");
        if(confirm){
            if (cart.length >=1)
            cart = cart.filter(item => item.id !== id);
            else cart = [];
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    next()
}
export const removeItemInCart = (id, next) => {
    const confirm = window.confirm("You want to delete this item?");
    if(confirm){
        cart = cart.filter(item => item.id !== id);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    next()
}
