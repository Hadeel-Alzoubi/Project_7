/** @format */

async function CategoryForProduct() {
  debugger;
  const url = "https://localhost:44362/api/Category/GetAllCategory";
  const CategoryContainer = document.getElementById("CategoryForProduct");

  try {
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    CategoryContainer.innerHTML = "";

    data.forEach((element) => {
      CategoryContainer.innerHTML += `
                <a href="#" onclick="ProductBycategoryId('${element.categoryId}')">${element.name}</a>
            `;
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

async function productsBrand() {
  const url = "https://localhost:44362/api/Products/GetBrandCount";
  const ProductBrandContainer = document.getElementById("productsBrand");

  try {
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    ProductBrandContainer.innerHTML = "";

    data.forEach((element) => {
      ProductBrandContainer.innerHTML += `
                <li>
                    <a href="#" onclick="ProductByBrand('${element.brandName}')">
                        ${element.brandName} <span>(${element.productCount})</span>
                    </a>
                </li>
            `;
    });
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

$(document).ready(function () {
  async function getAllProduct() {
    const url = "https://localhost:44362/api/Products/GetAllProducts";
    let productContainer = document.getElementById("productContainer");

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      data.forEach((element) => {
        productContainer.innerHTML += `
                    <div class="col-lg-4 col-md-4 col-sm-6 col-12">
                        <article class="single_product">
                            <figure>
                                <div class="product_thumb">
                                    <div class="label_product">
                                        <span class="label_new">new</span>
                                      <span class="label_sale">
  ${(
    ((element.price - element.priceWithDiscount) / element.price) *
    100
  ).toFixed(0)}%
</span>
                                    </div>
                                    <a class="primary_img" href="product-details.html"onclick="storeProductId(${
                                      element.productId
                                    })"><img src="/htmldemo.net/dorno/dorno/assets/img/product/${
          element.image
        }" alt="${element.name}"></a>
                                    <a class="secondary_img" href="product-details.html"onclick="storeProductId(${
                                      element.productId
                                    })"><img src="/htmldemo.net/dorno/dorno/assets/img/product/${
          element.image
        }" alt="${element.name}"></a>
                                    <div class="action_links">
                                        <ul>
                                            <li class="quick_button"><a href="#" data-bs-toggle="modal" data-bs-target="#modal_box" title="quick view"> <i class="icon icon-Eye"></i></a></li>
                                            <li class="wishlist"><a href="wishlist.html" title="Add to Wishlist"><i class="icon icon-Heart"></i></a></li>
                                            <li class="compare"><a href="#" title="Add to Compare"><i class="icon icon-MusicMixer"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="product_content grid_content">
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
                                      element.name
                                    }</a></h4>
                                    <div class="price_box">
                                        <span class="current_price">$${
                                          element.priceWithDiscount
                                        }</span>
                                        <span class="old_price">$${
                                          element.price
                                        }</span>
                                    </div>
                                    <div class="add_to_cart">
                                        <a  title="Add to cart" onclick="addToCart('${
                                          element.productId
                                        }', '${element.name}', '${
          element.priceWithDiscount
        }', '${element.image}')">Add to Cart</a>
                                    </div>
                                    <div class="swatches-colors">
                                        <ul>
                                            <li><a class="color1" href="javascript:void(0)"></a></li>
                                            <li><a class="color2" href="javascript:void(0)"></a></li>
                                            <li><a class="color3" href="javascript:void(0)"></a></li>
                                            <li><a class="color4" href="javascript:void(0)"></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="product_content list_content">
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
                                      element.name
                                    }</a></h4>
                                    <div class="product_desc">
                                        <p>${element.description}</p>
                                    </div>
                                    <div class="price_box">
                                        <span class="current_price">$${
                                          element.price
                                        }</span>
                                        <span class="old_price">$${
                                          element.priceWithDiscount
                                        }</span>
                                    </div>
                                    <div class="action_links list_action_right">
                                        <ul>
                                            <li class="add_to_cart"><a href="cart.html" title="Add to cart">Add to Cart</a></li>
                                            <li class="quick_button"><a href="#" data-bs-toggle="modal" data-bs-target="#modal_box" title="quick view"> <i class="icon icon-Eye"></i></a></li>
                                            <li class="wishlist"><a href="wishlist.html" title="Add to Wishlist"><i class="icon icon-Heart"></i></a></li>
                                            <li class="compare"><a href="#" title="Add to Compare"><i class="icon icon-MusicMixer"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </figure>
                        </article>
                    </div>
                `;
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  getAllProduct();
});
async function ProductByBrand(name) {
  debugger;
  const url = `https://localhost:44362/api/Products/GetProductByBrand/${name}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    let productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = "";
    data.forEach((element) => {
      productContainer.innerHTML += `
                <div class="col-lg-4 col-md-4 col-sm-6 col-12">
                    <article class="single_product">
                        <figure>
                            <div class="product_thumb">
                                <div class="label_product">
                                    <span class="label_new">new</span>
                                    <span class="label_sale">
                                        ${(
                                          ((element.price -
                                            element.priceWithDiscount) /
                                            element.price) *
                                          100
                                        ).toFixed(0)}%
                                    </span>
                                </div>
                                <a class="primary_img" href="product-details.html"><img src="/htmldemo.net/dorno/dorno/assets/img/product/${
                                  element.image
                                }" alt="${element.name}"></a>
                                <a class="secondary_img" href="product-details.html"><img src="/htmldemo.net/dorno/dorno/assets/img/product/${
                                  element.image
                                }" alt="${element.name}"></a>
                                <div class="action_links">
                                    <ul>
                                        <li class="quick_button"><a href="#" data-bs-toggle="modal" data-bs-target="#modal_box" title="quick view"> <i class="icon icon-Eye"></i></a></li>
                                        <li class="wishlist"><a href="wishlist.html" title="Add to Wishlist"><i class="icon icon-Heart"></i></a></li>
                                        <li class="compare"><a href="#" title="Add to Compare"><i class="icon icon-MusicMixer"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="product_content grid_content">
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
                                  element.name
                                }</a></h4>
                                <div class="price_box">
                                    <span class="current_price">$${
                                      element.priceWithDiscount
                                    }</span>
                                    <span class="old_price">$${
                                      element.price
                                    }</span>
                                </div>
                                <div class="add_to_cart">
                                    <a href="cart.html" title="Add to cart">Add to Cart</a>
                                </div>
                                <div class="swatches-colors">
                                    <ul>
                                        <li><a class="color1" href="javascript:void(0)"></a></li>
                                        <li><a class="color2" href="javascript:void(0)"></a></li>
                                        <li><a class="color3" href="javascript:void(0)"></a></li>
                                        <li><a class="color4" href="javascript:void(0)"></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="product_content list_content">
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
                                  element.name
                                }</a></h4>
                                <div class="product_desc">
                                    <p>${element.description}</p>
                                </div>
                                <div class="price_box">
                                    <span class="current_price">$${
                                      element.priceWithDiscount
                                    }</span>
                                    <span class="old_price">$${
                                      element.price
                                    }</span>
                                </div>
                                <div class="action_links list_action_right">
                                    <ul>
                                        <li class="add_to_cart"><a href="cart.html" title="Add to cart">Add to Cart</a></li>
                                        <li class="quick_button"><a href="#" data-bs-toggle="modal" data-bs-target="#modal_box" title="quick view"> <i class="icon icon-Eye"></i></a></li>
                                        <li class="wishlist"><a href="wishlist.html" title="Add to Wishlist"><i class="icon icon-Heart"></i></a></li>
                                        <li class="compare"><a href="#" title="Add to Compare"><i class="icon icon-MusicMixer"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </figure>
                    </article>
                </div>
            `;
    });
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}
async function ProductBycategoryId(id) {
  debugger;
  const url = `https://localhost:44362/api/Products/GetProductByCategoryID${id}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    let productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = "";

    data.forEach((element) => {
      productContainer.innerHTML += `
                <div class="col-lg-4 col-md-4 col-sm-6 col-12">
                    <article class="single_product">
                        <figure>
                            <div class="product_thumb">
                                <div class="label_product">
                                    <span class="label_new">new</span>
                                    <span class="label_sale">
                                        ${(
                                          ((element.price -
                                            element.priceWithDiscount) /
                                            element.price) *
                                          100
                                        ).toFixed(0)}%
                                    </span>
                                </div>
                                <a class="primary_img" href="product-details.html"onclick="storeProductId(${
                                  element.productId
                                })"><img src="/htmldemo.net/dorno/dorno/assets/img/product/${
        element.image
      }" alt="${element.name}"></a>
                                    <a class="secondary_img" href="product-details.html"onclick="storeProductId(${
                                      element.productId
                                    })"><img src="/htmldemo.net/dorno/dorno/assets/img/product/${
        element.image
      }" alt="${element.name}"></a>
                                <div class="action_links">
                                    <ul>
                                        <li class="quick_button"><a href="#" data-bs-toggle="modal" data-bs-target="#modal_box" title="quick view"> <i class="icon icon-Eye"></i></a></li>
                                        <li class="wishlist"><a href="wishlist.html" title="Add to Wishlist"><i class="icon icon-Heart"></i></a></li>
                                        <li class="compare"><a href="#" title="Add to Compare"><i class="icon icon-MusicMixer"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="product_content grid_content">
                                <div class="product_rating">
                                    <ul>
                                        <li><a href="#"><i class="icon icon-Star"></i></a></li>
                                        <li><a href="#"><i class="icon icon-Star"></i></a></li>
                                        <li><a href="#"><i class="icon icon-Star"></i></a></li>
                                        <li><a href="#"><i class="icon icon-Star"></i></a></li>
                                        <li><a href="#"><i class="icon icon-Star"></i></a></li>
                                    </ul>
                                </div>
                                <h4 class="product_name"><a href="product-details.html" onclick="storeProductId(event, ${
                                  element.productId
                                })">${element.name}</a></h4>
                                <div class="price_box">
                                    <span class="current_price">$${
                                      element.priceWithDiscount
                                    }</span>
                                    <span class="old_price">$${
                                      element.price
                                    }</span>
                                </div>
                                <div class="add_to_cart">
                                    <a href="cart.html" title="Add to cart">Add to Cart</a>
                                </div>
                                <div class="swatches-colors">
                                    <ul>
                                        <li><a class="color1" href="javascript:void(0)"></a></li>
                                        <li><a class="color2" href="javascript:void(0)"></a></li>
                                        <li><a class="color3" href="javascript:void(0)"></a></li>
                                        <li><a class="color4" href="javascript:void(0)"></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="product_content list_content">
                                <div class="product_rating">
                                    <ul>
                                        <li><a href="#"><i class="icon icon-Star"></i></a></li>
                                        <li><a href="#"><i class="icon icon-Star"></i></a></li>
                                        <li><a href="#"><i class="icon icon-Star"></i></a></li>
                                        <li><a href="#"><i class="icon icon-Star"></i></a></li>
                                        <li><a href="#"><i class="icon icon-Star"></i></a></li>
                                    </ul>
                                </div>
                                <h4 class="product_name"><a href="product-details.html" onclick="storeProductId(event, ${
                                  element.productId
                                })">${element.name}</a></h4>
                                <div class="product_desc">
                                    <p>${element.description}</p>
                                </div>
                                <div class="price_box">
                                    <span class="current_price">$${
                                      element.priceWithDiscount
                                    }</span>
                                    <span class="old_price">$${
                                      element.price
                                    }</span>
                                </div>
                                <div class="action_links list_action_right">
                                    <ul>
                                        <li class="add_to_cart"><a href="cart.html" title="Add to cart">Add to Cart</a></li>
                                        <li class="quick_button"><a href="#" data-bs-toggle="modal" data-bs-target="#modal_box" title="quick view"> <i class="icon icon-Eye"></i></a></li>
                                        <li class="wishlist"><a href="wishlist.html" title="Add to Wishlist"><i class="icon icon-Heart"></i></a></li>
                                        <li class="compare"><a href="#" title="Add to Compare"><i class="icon icon-MusicMixer"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </figure>
                    </article>
                </div>
            `;
    });
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

// Function to store the productId in localStorage

var slider = document.getElementById("slider-range");

noUiSlider.create(slider, {
  start: [0, 1000],
  connect: true,
  range: {
    min: 0,
    max: 1000,
  },
  step: 1,
  format: {
    to: function (value) {
      return value.toFixed(2);
    },
    from: function (value) {
      return Number(value);
    },
  },
});

slider.noUiSlider.on("update", function (values) {
  document.getElementById("amount").value = values.join(" - ");
});

document
  .getElementById("PriceRange")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form submission behavior

    let productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = "";

    var minPrice = parseFloat(slider.noUiSlider.get()[0]);
    var maxPrice = parseFloat(slider.noUiSlider.get()[1]);

    try {
      let response = await fetch(
        `https://localhost:44362/api/Products/FilterByPrice?minPrice=${minPrice}&maxPrice=${maxPrice}`
      );

      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the response as JSON
      let data = await response.json();
      console.log("Filtered Products:", data); // Log data to ensure you are receiving the correct response

      // Loop through each product returned from the API
      data.forEach((element) => {
        console.log("Product:", element); // Log individual product

        productContainer.innerHTML += `
                <div class="col-lg-4 col-md-4 col-sm-6 col-12">
                    <article class="single_product">
                        <figure>
                            <div class="product_thumb">
                                <div class="label_product">
                                    <span class="label_new">new</span>
                                    <span class="label_sale">
                                        ${(
                                          ((element.price -
                                            element.priceWithDiscount) /
                                            element.price) *
                                          100
                                        ).toFixed(0)}%
                                    </span>
                                </div>
                                <a class="primary_img" href="product-details.html"onclick="storeProductId(${
                                  element.productId
                                })"><img src="/htmldemo.net/dorno/dorno/assets/img/product/${
          element.image
        }" alt="${element.name}"></a>
                                    <a class="secondary_img" href="product-details.html" onclick="storeProductId(${
                                      element.productId
                                    })"><img src="/htmldemo.net/dorno/dorno/assets/img/product/${
          element.image
        }" alt="${element.name}"></a>
                                <div class="action_links">
                                    <ul>
                                        <li class="quick_button"><a href="#" data-bs-toggle="modal" data-bs-target="#modal_box" title="quick view"> <i class="icon icon-Eye"></i></a></li>
                                        <li class="wishlist"><a href="wishlist.html" title="Add to Wishlist"><i class="icon icon-Heart"></i></a></li>
                                        <li class="compare"><a href="#" title="Add to Compare"><i class="icon icon-MusicMixer"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="product_content grid_content">
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
                                  element.name
                                }</a></h4>
                                <div class="price_box">
                                    <span class="current_price">$${
                                      element.priceWithDiscount
                                    }</span>
                                    <span class="old_price">$${
                                      element.price
                                    }</span>
                                </div>
                                <div class="add_to_cart">
                                    <a href="cart.html" title="Add to cart">Add to Cart</a>
                                </div>
                                <div class="swatches-colors">
                                    <ul>
                                        <li><a class="color1" href="javascript:void(0)"></a></li>
                                        <li><a class="color2" href="javascript:void(0)"></a></li>
                                        <li><a class="color3" href="javascript:void(0)"></a></li>
                                        <li><a class="color4" href="javascript:void(0)"></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="product_content list_content">
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
                                  element.name
                                }</a></h4>
                                <div class="product_desc">
                                    <p>${element.description}</p>
                                </div>
                                <div class="price_box">
                                    <span class="current_price">$${
                                      element.priceWithDiscount
                                    }</span>
                                    <span class="old_price">$${
                                      element.price
                                    }</span>
                                </div>
                                <div class="action_links list_action_right">
                                    <ul>
                                        <li class="add_to_cart"><a href="cart.html" title="Add to cart">Add to Cart</a></li>
                                        <li class="quick_button"><a href="#" data-bs-toggle="modal" data-bs-target="#modal_box" title="quick view"> <i class="icon icon-Eye"></i></a></li>
                                        <li class="wishlist"><a href="wishlist.html" title="Add to Wishlist"><i class="icon icon-Heart"></i></a></li>
                                        <li class="compare"><a href="#" title="Add to Compare"><i class="icon icon-MusicMixer"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </figure>
                    </article>
                </div>
            `;
      });
    } catch (error) {
      console.error("Error:", error); // Catch and log any errors
    }
  });

function storeProductId(productId) {
  debugger;
  localStorage.productId = productId;
}

productsBrand();
CategoryForProduct();

function storeProductId(productId) {
  debugger;
  localStorage.setItem("selectedProductId", productId);
  console.log("Product ID stored in localStorage:", productId);
}

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
    debugger;

    const cartItem = {
      product_id: productId,
      quantity: 1,
      name: name,
      price: price,
      image: image,
    };

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
