/** @format */

async function getAllCategory() {
  debugger;
  const url = "https://localhost:44362/api/Category/GetAllCategory";
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data = await response.json();
    console.log(data);

    const CategorySectionHome = document.getElementById("CategorySectionHome");
    data.forEach((element) => {
      CategorySectionHome.innerHTML += `
            <li>
                                    <a data-bs-toggle="tab" href="#display" role="tab" aria-controls="display" aria-selected="false" onclick="showProductByCategoryID(${element.categoryId})">
                                        ${element.name} 
                                    </a>
                                </li>`;
    });
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

debugger;
$(document).ready(function () {
  async function addProducts() {
    const url = "https://localhost:44362/api/Products/GetAllProducts";

    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let data = await response.json();

      if ($(".product_carousel").hasClass("owl-carousel")) {
        $(".product_carousel").trigger("destroy.owl.carousel");
        $(".product_carousel").html("");
      }

      let productsHtml = "";
      data.forEach((product) => {
        productsHtml += `
                    <div class="col-lg-3 single_product" data-product-id="${
                      product.productId
                    }"> <!-- Add product ID here -->
                        <article class="single_product">
                            <figure>
                                <div class="product_thumb">
                                    <div class="label_product">
                                        <span class="label_new">new</span>
                                    </div>
                                    <a class="primary_img" href="product-details.html" onclick="storeProductId(${
                                      product.productId
                                    })"><img src="/htmldemo.net/dorno/dorno/assets/img/product/${
          product.image
        }" alt="${product.name}"></a>
                                    <a class="secondary_img" href="product-details.html"><img src="/htmldemo.net/dorno/dorno/assets/img/product/${
                                      product.image
                                    }" alt="${
          product.name
        }"  onclick="storeProductId(${product.productId})"></a>
                                    <div class="action_links">
                                        <ul>
                                            <li class="quick_button"><a href="#" data-bs-toggle="modal" data-bs-target="#modal_box" title="quick view"><i class="icon icon-Eye" onclick="showProductsdetail(${
                                              product.productId
                                            })"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <figcaption class="product_content">
                                   
                                    <h4 class="product_name"><a href="product-details.html">${
                                      product.name
                                    }</a></h4>
                                    <div class="price_box">
                                        <span class="current_price">$${
                                          product.priceWithDiscount
                                        }</span>
                                        ${
                                          product.price
                                            ? `<span class="old_price">$${product.price}</span>`
                                            : ""
                                        }
                                    </div>
                                    <div class="add_to_cart">
                                        <a  class= "btn" title="Add to cart"  onclick="addToCart('${
                                          product.productId
                                        }', '${product.name}', '${
          product.price
        }', '${product.image}')" >Add to Cart</a>
                                    </div>
                                </figcaption>
                            </figure>
                        </article>
                    </div>
                `;
      });

      $(".product_carousel").html(productsHtml);

      $(".product_carousel").owlCarousel({
        items: 4,
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        autoplay: true,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  addProducts();
});

async function showProductsdetail(e) {
  const url = `https://localhost:44362/api/Products/GetProductByID/${e}`;
  debugger;
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let product = await response.json();
    console.log(product);

    $("#modal_box .modal_title h2").text(product.name);
    $("#modal_box .modal_price .new_price").text(`$${product.price}`);
    $("#modal_box .modal_price .old_price").text(
      product.oldPrice ? `$${product.oldPrice}` : ""
    );
    $("#modal_box .modal_description p").text(product.description);

    $("#modal_box .modal_tab_img a img").attr("src", product.image);

    $("#modal_box .modal_tab_button .nav").html(`
          <li>
              <a class="nav-link active" data-bs-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="true">
                  <img src="/htmldemo.net/dorno/dorno/assets/img/product/${product.image}" alt="${product.name}"onclick="storeProductId(${product.productId})">
              </a>
          </li>
      `);

    // Large image in the modal
    $("#modal_box .product-details-large").html(`
          <div class="tab-pane fade show active" id="tab1" role="tabpanel">
              <div class="modal_tab_img">
                  <a href="#"><img src="/assets/img/product/${product.image}" alt="${product.name}"onclick="storeProductId(${product.productId})"></a>    
              </div>
          </div>
      `);

    // Show the modal
    $("#modal_box").modal("show");
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}

getAllCategory();

async function showProductByCategoryID(e) {
  const url = `https://localhost:44362/api/Products/GetProductByCategoryID${e}`;

  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    let data = await response.json();

    if ($(".product_carousel").hasClass("owl-carousel")) {
      $(".product_carousel").trigger("destroy.owl.carousel");
      $(".product_carousel").html("");
    }

    let productsHtml = "";
    data.forEach((product) => {
      productsHtml += `
                    <div class="col-lg-3 single_product" data-product-id="${
                      product.productId
                    }" > <!-- Add product ID here -->
                        <article class="single_product">
                            <figure>
                                <div class="product_thumb">
                                    <div class="label_product">
                                        <span class="label_new">new</span>
                                    </div>
                                    <a class="primary_img" href="product-details.html"onclick="storeProductId(${
                                      product.productId
                                    })"><img src="/htmldemo.net/dorno/dorno/assets/img/product/${
        product.image
      }" alt="${product.name}"></a>
                                    <a class="secondary_img" href="product-details.html" onclick="storeProductID(${
                                      product.productId
                                    })"><img src="/htmldemo.net/dorno/dorno/assets/img/product/${
        product.image
      }" alt="${product.name}"></a>
                                    <div class="action_links">
                                        <ul>
                                            <li class="quick_button"><a href="#" data-bs-toggle="modal" data-bs-target="#modal_box" title="quick view"><i class="icon icon-Eye" onclick="showProductsdetail(${
                                              product.productId
                                            })"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <figcaption class="product_content">
                                    <div class="product_rating">
                                        <ul>
                                            <li><a href="#"><i class="icon icon-Star"></i></a></li>
                                            <li><a href="#"><i class="icon icon-Star"></i></a></li>
                                            <li><a href="#"><i class="icon icon-Star"></i></a></li>
                                            <li><a href="#"><i class="icon icon-Star"></i></a></li>
                                            <li><a href="#"><i class="icon icon-Star"></i></a></li>
                                        </ul>
                                    </div>
                                    <h4 class="product_name"><a href="product-details.html">${
                                      product.name
                                    }</a></h4>
                                    <div class="price_box">
                                        <span class="current_price">$${
                                          product.price
                                        }</span>
                                        ${
                                          product.priceWithDiscount
                                            ? `<span class="old_price">$${product.priceWithDiscount}</span>`
                                            : ""
                                        }
                                    </div>
                                    <div class="add_to_cart">
                                        <a href="cart.html" title="Add to cart">Add to Cart</a>
                                    </div>
                                </figcaption>
                            </figure>
                        </article>
                    </div>
                `;
    });

    $(".product_carousel").html(productsHtml);

    $(".product_carousel").owlCarousel({
      items: 4,
      loop: true,
      margin: 10,
      nav: true,
      dots: false,
      autoplay: true,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////

var UserId = localStorage.getItem("UserId");

async function addToCart(productId, name, price, image) {
  if (UserId != null) {
    var url = `https://localhost:44362/api/Cart/AddCartItem/${UserId}`;

    var data = {
      ProductId: productId,
      Quantity: 1,
    };

    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Product added successfully to the cart!");
      window.location.reload();
    } else {
      let error = await response.text();
      console.error("Error:", error);
    }
  } else {
    const cartItem = {
      product_id: productId,
      quantity: 1,
      name: name,
      price: price,
      image: image,
    };

    // Check if there is already a cart in localStorage
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Check if the product is already in the cart
    let existingItem = cartItems.find((item) => item.product_id === productId);

    if (existingItem) {
      // If the product is already in the cart, update the quantity
      existingItem.quantity =
        parseInt(existingItem.quantity) + parseInt(QuantityOfProduct);
    } else {
      // If it's a new product, add it to the cart array
      cartItems.push(cartItem);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    alert("Product added successfully to the cart!");

    // Optionally, reload or redirect to another page
    window.location.reload();
  }
}

///////////////////////////////////////////////////////////////////////////////////////////

async function showItemsCart() {
  var token = localStorage.getItem("Token");

  var userId = localStorage.getItem("UserId");
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
                <a href="#"><img src="/htmldemo.net/dorno/dorno/assets/img/product/${item.image}" alt=""/onclick="storeProductId(${product.productId})"></a>
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
                 <a href="#"><img src="/htmldemo.net/dorno/dorno/assets/img/product/${item.product.image}" alt=""onclick="storeProductId(${product.productId})"/></a>
            </div>
                          <div class="cart_info">
                            <a href="#"
                              >${item.product.name}</a
                            >
                            <p>${item.quantity} x <span> ${item.product.price} </span></p>
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
// function storeProductId(productId) {
//   localStorage.setItem("selectedProductId", productId);
// }

// function storeProductID(productId) {
//   debugger;
//   localStorage.productId = productId;
// }
function storeProductId(productId) {
  debugger;
  localStorage.setItem("selectedProductId", "");
  localStorage.setItem("selectedProductId", productId);
  console.log("Product ID stored in localStorage:", productId);
}
