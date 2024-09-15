/** @format */
var token = localStorage.getItem("Token");
var userId = localStorage.getItem("UserId");
var totalCartPrice = 0; // Example cart price, set to a valid value
var disconteAmount = 0;

var errorMessage = document.getElementById("errorMessage");

async function checkVoucher() {
  if (userId == null) {
    alert("You must be login befor using Voucher!");
  } else {
    var voucher = document.getElementById("inputVoucher").value;

    const url = `https://localhost:44362/api/Cart/ApplyVoucher/${voucher}`;

    try {
      var response = await fetch(url);
      var data = await response.json();

      if (!response.ok) {
        errorMessage.innerHTML = data.message;
      } else {
        disconteAmount = parseFloat(data.discount);

        var discount = (disconteAmount / 100) * totalCartPrice;
        var totalAfterDisconte = totalCartPrice - discount;

        var disconteAmountText = document.getElementById("disconteAmount");
        disconteAmountText.textContent = `$${discount.toFixed(2)}`;

        var totalAfterDisconteText =
          document.getElementById("totalAfterDisconte");
        totalAfterDisconteText.innerHTML = `$${totalAfterDisconte.toFixed(2)}`;

        localStorage.amountForPay = totalAfterDisconte.toFixed(2);

        errorMessage.innerHTML = "";

        alert("Voucher applied successfully!");
      }
    } catch (error) {
      console.error("Error applying voucher:", error);
      errorMessage.innerHTML = "An error occurred while applying the voucher.";
    }
  }
}

disconteAmountText = document.getElementById("disconteAmount");
disconteAmountText.textContent = `$${disconteAmount.toFixed(2)}`;

// Convert the object to a string and save it in local storage

async function showItemsCart() {
  if (token == null) {
    var selectedItems = JSON.parse(localStorage.getItem("cartItems"));

    let itemContainer = document.getElementById("table");

    selectedItems.forEach((item) => {
      totalCartPrice += item.price * item.quantity;

      itemContainer.innerHTML += `
    <tr id="item-row-${item.product_id}">
      <td class="product_remove" style="cursor: pointer;">
        <i onclick="deleteItem1(${item.product_id})" class="fa fa-trash-o"></i>
      </td>
      <td class="product_thumb">
         <a href="#"><img src="/htmldemo.net/dorno/dorno/assets/img/product/${
           item.image
         }" alt=""></a>
      </td>
      <td class="product_name">
        <a href="#">${item.name}</a>
      </td>
      <td class="product-price">$${item.price}</td>
      <td class="product_quantity">
        <label>Quantity</label>
        <input id="quantity-${item.product_id}" min="1" max="100"
               value="${item.quantity}" type="number"
                onchange="changeQuantity1(${item.product_id}, ${item.price})">
      </td>
      <td id="total-price-${item.product_id}" class="product_total">
        $${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `;
    });

    let cartTotalElements = document.getElementById("totalCartPrice");
    cartTotalElements.innerHTML = `$${totalCartPrice.toFixed(2)}`;

    let totalAfterDisconte = totalCartPrice - disconteAmount;

    let totalAfterDisconteText = document.getElementById("totalAfterDisconte");
    totalAfterDisconteText.innerHTML = `$${totalAfterDisconte.toFixed(2)}`;

    localStorage.amountForPay = totalAfterDisconte.toFixed(2);
  } else {
    let url = `https://localhost:44362/api/Cart/getUserCartItems/${userId}`;

    let request = await fetch(url);
    let data = await request.json();
    let itemContainer = document.getElementById("table");

    data.forEach((item) => {
      totalCartPrice += item.product.priceWithDiscount * item.quantity;

      itemContainer.innerHTML += `
    <tr id="item-row-${item.cartItemId}">
      <td class="product_remove" style="cursor: pointer;">
        <i onclick="deleteItem(${item.cartItemId})" class="fa fa-trash-o"></i>
      </td>
      <td class="product_thumb">
        <a href="#"><img src="/htmldemo.net/dorno/dorno/assets/img/product/${
          item.product.image
        }" alt=""></a>
      </td>
      <td class="product_name">
        <a href="#">${item.product.name}</a>
      </td>
      <td class="product-price">$${item.product.priceWithDiscount}</td>
      <td class="product_quantity">
        <label>Quantity</label>
        <input id="quantity-${item.cartItemId}" min="1" max="100"
               onchange="changeQuantity(${item.cartItemId}, ${
        item.product.priceWithDiscount
      })"
               value="${item.quantity}" type="number">
      </td>
      <td id="total-price-${item.cartItemId}" class="product_total">
        $${(item.product.priceWithDiscount * item.quantity).toFixed(2)}
      </td>
    </tr>
  `;
    });

    let cartTotalElements = document.getElementById("totalCartPrice");
    cartTotalElements.innerHTML = `$${totalCartPrice.toFixed(2)}`;

    let totalAfterDisconte = totalCartPrice - disconteAmount;

    let totalAfterDisconteText = document.getElementById("totalAfterDisconte");
    totalAfterDisconteText.innerHTML = `$${totalAfterDisconte.toFixed(2)}`;

    localStorage.amountForPay = totalAfterDisconte.toFixed(2);
  }
}
showItemsCart();

// Function to change the quantity of the cart item in local storage
function changeQuantity1(cartItemId, priceWithDiscount) {
  // Get the quantity input value
  const quantityInput = document.getElementById(`quantity-${cartItemId}`);
  const newQuantity = parseInt(quantityInput.value);

  // Get the current cart items from local storage
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));

  // Update the quantity of the specific item in local storage
  cartItems = cartItems.map((item) => {
    if (item.product_id == cartItemId) {
      item.quantity = newQuantity;
    }
    return item;
  });

  // Save the updated cart items back to local storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  // Update the total price for the item on the UI
  const totalPriceElement = document.getElementById(
    `total-price-${cartItemId}`
  );
  const updatedTotalPrice = (priceWithDiscount * newQuantity).toFixed(2);
  totalPriceElement.textContent = `$${updatedTotalPrice}`;

  // Optional: If you have a total cart price displayed somewhere, you can also update it
  updateTotalCartPrice();
}

// Function to recalculate and update the total cart price
function updateTotalCartPrice() {
  let totalCartPrice = 0;
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));

  cartItems.forEach((item) => {
    totalCartPrice += parseFloat(item.price) * item.quantity;
  });

  // Update the total cart price element (assuming you have one in the HTML)
  document.getElementById(
    "totalCartPrice"
  ).textContent = `$${totalCartPrice.toFixed(2)}`;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

function deleteItem1(productId) {
  let storedCartItems = JSON.parse(localStorage.getItem("cartItems"));

  const updatedCartItems = storedCartItems.filter(
    (item) => item.product_id !== productId.toString()
  );

  localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

  const itemRow = document.getElementById(`item-row-${productId}`);
  if (itemRow) {
    itemRow.remove();
  }

  updateTotalPrice();
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function deleteItem(cartItemId) {
  let url = `https://localhost:44362/api/Cart/deleteItemById/${cartItemId}`;

  fetch(url, {
    method: "DELETE",
  }).then((response) => {
    if (response.ok) {
      const itemRow = document.getElementById(`item-row-${cartItemId}`);
      if (itemRow) {
        itemRow.remove();
      }
      alert("Item was deleted!");
    }
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function changeQuantity(cartItemId, productPrice) {
  const Quantity = document.getElementById(`quantity-${cartItemId}`);
  const newQuantity = parseInt(Quantity.value);

  const url = `https://localhost:44362/api/Cart/changeQuantity`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cartItemId: cartItemId,
      quantity: newQuantity,
    }),
  });

  // Calculate the new total for the specific item
  const newTotalPrice = productPrice * newQuantity;

  // Get the old total for the specific item from the DOM
  const oldTotalPriceElement = document.getElementById(
    `total-price-${cartItemId}`
  );
  const oldTotalPrice = parseFloat(
    oldTotalPriceElement.innerHTML.replace("$", "")
  );

  oldTotalPriceElement.innerHTML = `$${newTotalPrice.toFixed(2)}`;

  totalCartPrice = totalCartPrice - oldTotalPrice + newTotalPrice;

  let cartTotalElements = document.getElementById("totalCartPrice");
  cartTotalElements.textContent = `$${totalCartPrice.toFixed(2)}`;

  let totalAfterDisconte = totalCartPrice - disconteAmount;

  // Update totalAfterDisconteText in the DOM
  let totalAfterDisconteText = document.getElementById("totalAfterDisconte");
  totalAfterDisconteText.innerHTML = `$${totalAfterDisconte.toFixed(2)}`;

  localStorage.amountForPay = totalAfterDisconte.toFixed(2);
}

///////////////////////////////////////////////////////////////////////////////////////////

async function checkOut() {
  debugger;
  localStorage.checkOut = true;

  const userId = localStorage.getItem("UserId");

  // Check if userId is null and redirect if needed
  if (userId === null) {
    window.location.href = "/batool/login.html";
  } else {
    window.location.href = "/htmldemo.net/dorno/dorno/paypal.html";
  }
}
