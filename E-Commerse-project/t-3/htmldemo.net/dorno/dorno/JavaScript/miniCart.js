/** @format */

var token = localStorage.getItem("Token");

var userId = localStorage.getItem("UserId");

async function showItemsCart() {
  debugger;
  if (token == null) {
    var selectedItems = JSON.parse(localStorage.getItem("cartItems"));

    var numberOfSelectedItems = document.getElementById(
      "numberOfSelectedItems"
    );
    numberOfSelectedItems.innerHTML = selectedItems.length;

    var miniCart = document.getElementById("cartGallery");

    selectedItems.forEach((item) => {
      miniCart.innerHTML += `
      <div class="cart_item">
            <div class="cart_img">
                 <a href="#"><img src="/htmldemo.net/dorno/dorno/assets/img/product/${item.image}" alt=""/></a>
            </div>
                          <div class="cart_info">
                            <a href="#"
                              >${item.name}</a
                            >
                            <p>${item.quantity} x <span> ${item.price} </span></p>
                          </div>
                          <div class="cart_remove">
                            <a href="#"
                              ><i class="ion-ios-close-outline"></i
                            ></a>
            </div>
        </div>
    `;
    });
  } else {
    let url = `https://localhost:44362/api/Cart/getUserCartItems/${userId}`;

    let request = await fetch(url);
    let data = await request.json();
    var miniCart = document.getElementById("cartGallery");

    var numberOfSelectedItems = document.getElementById(
      "numberOfSelectedItems"
    );
    numberOfSelectedItems.innerHTML = data.length;
    data.forEach((item) => {
      miniCart.innerHTML += `
      <div class="cart_item">
            <div class="cart_img">
                <a href="#"><img src="/htmldemo.net/dorno/dorno/assets/img/product/${item.product.image}" alt=""/></a>
            </div>
                          <div class="cart_info">
                            <a href="#"
                              >${item.product.name}</a
                            >
                            <p>${item.quantity} x <span> ${item.product.priceWithDiscount} </span></p>
                          </div>
                          <div class="cart_remove">
                            <a href="#"
                              ><i class="ion-ios-close-outline"></i
                            ></a>
            </div>
        </div>
    `;
    });
  }
}

showItemsCart();

///////////////////////////////////////////////////////////////////////////////
