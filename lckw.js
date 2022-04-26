let cartIcon = document.querySelector("#shopping-cart-icon");
let cart = document.querySelector(".cart");
let cartClose = document.querySelector("#cartClose");

cartIcon.onclick = () =>{
    cart.classList.add("active");
};

cartClose.onclick = () =>{
    cart.classList.remove("active");
};

if (document.redayState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
} else{ 
    ready();
}

function ready(){
    var removeCartButtons = document.getElementsByClassName("cartRemove");
    console.log(removeCartButtons);
    for(var i=0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    var quantityInputs = document.getElementsByClassName("cartQuantity");
    for(var i=0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    
    var addCart = document.getElementsByClassName("add-cart");
    for(var i=0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", buyButtonClicked);
}





function buyButtonClicked(){
    alert("Your Order is placed");
    var cartContent = document.getElementsByClassName("cartContent")[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updatetotal();
}

function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("productTitle")[0].innerText;
    var price = shopProducts.getElementsByClassName("productPrice")[0].innerText;
    var product_Img = shopProducts.getElementsByClassName("productImg")[0].src;
    addProductToCart(title, price, product_Img);
    updatetotal();
}

function addProductToCart(title, price, product_Img){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cartBox");
    var cartItems = document.getElementsByClassName("cartContent")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cartProductTitle");
    for(var i=0; i < cartItemsNames.length; i++){
        if (cartItemsNames[i].innerText == title){
          alert("Item has been added to cart");
          return;
        }
    }

    var cartBoxContent = `
                        <img src="${product_Img}" alt="" class="cartImage">
                        <div class="detailBox">
                              <div class="cartProductTitle">${title}</div>
                              <div class="cartPrice">${price}</div>
                              <input type="number" value="1" class="cartQuantity">
                        </div>
                        <i class="fa fa-trash fa-lg cartRemove"></i>`;
 cartShopBox.innerHTML = cartBoxContent;
 cartItems.append(cartShopBox)
 cartShopBox
  .getElementsByClassName("cartRemove")[0]
  .addEventListener("click", removeCartItem);
 cartShopBox
  .getElementsByClassName("cartQuantity")[0]
  .addEventListener("change", quantityChanged);

}

function updatetotal(){
    var cartContents = document.getElementsByClassName("cartContent")[0];
    var cartBoxes = cartContents.getElementsByClassName("cartBox");
    var total = 0;
    for(var i=0; i < cartBoxes.length; i++){
        var cart_Box = cartBoxes[i];
        var priceElement = cart_Box.getElementsByClassName("cartPrice")[0];
        var quantityElement = cart_Box.getElementsByClassName("cartQuantity")[0];
        var price = parseFloat(priceElement.innerText.replace("RM",""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total *100)/100

    document.getElementsByClassName("totalPrice")[0].innerText = "RM" + total;
}