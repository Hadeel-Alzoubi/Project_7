/** @format */
debugger;
var UserId = localStorage.getItem("UserId");
var productID = localStorage.getItem("selectedProductId");
async function GetProductById() {
  if (!productID) {
    console.error("No product ID found in localStorage.");
    return;
  }

  const url = `https://localhost:44362/api/Products/GetProductByIDStars/${productID}`;
  const productContainer = document.getElementById("containerProductDetails");

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const product = await response.json();
    localStorage.setItem("CategorayID", product.product.categoryId);
    console.log(product);

    // Update the product details in the DOM
    productContainer.innerHTML = `
            <div class="row">
                <div class="col-lg-6 col-md-6">
                    <div class="product-details-tab">
                        <div id="img-1" class="zoomWrapper single-zoom">
                            <a href="#">
                                <img id="zoom1" src="/htmldemo.net/dorno/dorno/assets/img/product/${
                                  product.product.image
                                }" data-zoom-image="assets/img/product/${
      product.product.image
    }" alt="${product.product.name}">
                            </a>
                        </div>
                        <div class="single-zoom-thumb">
                            
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6">
                    <div class="product_d_right">
                       <form action="#">
                            <h1><a href="#">${product.product.name}</a></h1>
                            <div class="product_nav">
                                <ul>
                                    <li class="prev"><a href="#"><i class="fa fa-angle-left"></i></a></li>
                                    <li class="next"><a href="#"><i class="fa fa-angle-right"></i></a></li>
                                </ul>
                            </div>
                            <div class="product_ratting">
                            
                                <ul>
                                    <li class="review"><a href="#"> ${generateStars(
                                      product.stars
                                    )} </a></li>
                                </ul>
                            </div>
                            <div class="price_box">
                                <span class="current_price">$${
                                  product.product.priceWithDiscount
                                }</span>
                                <span class="old_price">$${
                                  product.product.price
                                }</span>
                            </div>
                            <div class="product_desc">
                                <p>${product.product.description}</p>
                            </div>
                            <div class="product_variant color">
                                <h3>Available Options</h3>
                                <label>color</label>
                                
                            </div>
                            <div class="product_variant quantity">
                                <label>quantity</label>
                                <input min="1" max="100" value="1" type="number" id="quantity-${
                                  product.product.productId
                                }">
                                <button class="button" onclick="addToCart('${
                                  product.product.productId
                                }', '${product.product.name}', '${
      product.product.priceWithDiscount
    }','${product.product.image}')">add to cart</button>  

                              
                            </div>
                            <div class="product_d_action">
                                <ul>
                                    <li><a href="#" title="Add to wishlist">+ Add to Wishlist</a></li>
                                    <li><a href="#" title="Add to Compare">+ Compare</a></li>
                                </ul>
                            </div>
                            <div class="product_meta">
                                <span>Category: <a href="#">${
                                  product.product.category
                                }</a></span>
                            </div>
                        </form>
                        <div class="priduct_social">
                            <ul>
                                <li><a class="facebook" href="#" title="facebook"><i class="fa fa-facebook"></i> Like</a></li>           
                                <li><a class="twitter" href="#" title="twitter"><i class="fa fa-twitter"></i> tweet</a></li>           
                                <li><a class="pinterest" href="#" title="pinterest"><i class="fa fa-pinterest"></i> save</a></li>           
                                <li><a class="google-plus" href="#" title="google +"><i class="fa fa-google-plus"></i> share</a></li>        
                                <li><a class="linkedin" href="#" title="linkedin"><i class="fa fa-linkedin"></i> linked</a></li>        
                            </ul>      
                        </div>
                    </div>
                </div>
            </div>
        `;
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  loadComments(productID);

  document.querySelector("form").addEventListener("submit", function (e) {
    debugger;
    submitComment(productID);
    alert("We receive your comment!");
    window.location.reload();
  });
});

async function submitComment(productID) {
  debugger;
  const author = document.getElementById("author").value;
  const email = document.getElementById("email").value;
  const commentText = document.getElementById("review_comment").value;
  const rating = document.getElementById("star-rating").value;
  event.preventDefault();
  const comment = {
    UserId: UserId,
    ProductId: localStorage.getItem("selectedProductId"),
    Comment1: commentText,
    Rating: rating,
    Status: "pending",
  };
  debugger;

  try {
    const response = await fetch(
      "https://localhost:44362/api/Comments/AddComment",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
      }
    );

    alert("We receive your comment");
    loadComments(productId);
    window.location.reload();
  } catch (error) {
    console.error("Error submitting comment:", error);
  }
}

async function loadComments(productId) {
  try {
    const response = await fetch(
      `https://localhost:44362/api/Comments/GetComments/${productId}`
    );
    const comments = await response.json();
    document.getElementById(
      "Reviews"
    ).innerHTML = `Reviews(${comments.length})`;
    console.log(comments);
    const reviewsWrapper = document.querySelector(".reviews_wrapper");

    comments.forEach((comment) => {
      const commentHtml = `
                <div class="reviews_comment_box">
                    <div class="comment_thmb">
                        <img src="/htmldemo.net/dorno/dorno/assets/img/blog/comment2.jpg" alt="User Image">
                    </div>
                    <div class="comment_text">
                        <div class="reviews_meta">
                            <div class="star_rating">
                                <ul>
                                    ${generateStars(comment.rating)}
                                </ul>
                            </div>
                            <p><strong>${comment.userName}</strong> - ${
        comment.date
      }</p>
                            <span>${comment.comment1}</span>
                        </div>
                    </div>
                </div>`;

      reviewsWrapper.innerHTML += commentHtml;
    });
  } catch (error) {
    console.error("Error loading comments:", error);
  }
}

function generateStars(rating) {
  debugger;
  let starsHtml = "";
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      starsHtml += '<li><a href="#"><i class="icon icon-Star"></i></a></li>';
    }
  }
  return starsHtml;
}

GetProductById();

///////////////////////////////////////////////////////////////////////////////////////////////////////
var UserId = localStorage.getItem("UserId");
var productId = localStorage.getItem("selectedProductId");
async function addToCart(productId, name, price, image) {
  if (UserId != null) {
    // If user is logged in, add the product to the backend cart
    var QuantityOfProduct = document.getElementById(
      `quantity-${productId}`
    ).value;

    var url = `https://localhost:44362/api/Cart/AddCartItem/${UserId}`;

    var data = {
      ProductId: productId,
      Quantity: QuantityOfProduct,
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
    // If user is not logged in, store cart data in localStorage
    var QuantityOfProduct = document.getElementById(
      `quantity-${productId}`
    ).value;

    // Create a cart item object
    const cartItem = {
      product_id: productId,
      quantity: QuantityOfProduct,
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
async function showProductByCategoryID(e) {
  debugger;
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
showProductByCategoryID(localStorage.getItem("CategorayID"));
///////////////////////////////////////////////////////////////////////////////////////////////////////
