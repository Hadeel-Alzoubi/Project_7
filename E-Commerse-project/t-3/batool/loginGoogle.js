/** @format */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAv5vCoLdqubm_IJAOjNlgF7o9zo-1-VfE",
  authDomain: "login-3e8e4.firebaseapp.com",
  projectId: "login-3e8e4",
  storageBucket: "login-3e8e4.appspot.com",
  messagingSenderId: "251369161445",
  appId: "1:251369161445:web:ef0c157a6b0cdcdb1a0a0c",
};

// Initialize Firebase app and authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set the language code for authentication messages
auth.languageCode = "en";

// Create a new instance of GoogleAuthProvider for Google sign-in
const provider = new GoogleAuthProvider();

// Get the login button element from the DOM
const googleLogin = document.getElementById("google-login-btn");

// Check if the button exists before attaching the event listener
if (googleLogin) {
  debugger;
  googleLogin.addEventListener("click", async function () {
    try {
      console.log("Button clicked, attempting login...");

      // Sign in using Google Popup
      const result = await signInWithPopup(auth, provider);

      // Get user data from the result
      const user = result.user;
      const { uid, displayName, email, photoURL } = user;

      // Store user data in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid,
          displayName,
          email,
          photoURL,
        })
      );

      // Prepare the user data for the API request
      const userData = {
        Email: email,
        Password: uid,
      };

      // Define the API URL
      const url = "https://localhost:44362/api/Users/login";
      debugger;
      // Make the POST request using fetch and await the response
      var response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(userData).toString(),
      });

      // Parse the response JSON
      var data = await response.json();

      // Store the token and user ID in localStorage
      localStorage.setItem("Token", data.token);
      localStorage.setItem("UserId", data.userId);

      alert("Login successfully");

      // Redirect to the index page after successful login

      ////////////////////////////////////////////////////////////////////////////////////////////

      var cartItems = JSON.parse(localStorage.getItem("cartItems"));
      var UserId = localStorage.getItem("UserId");

      if (cartItems && cartItems.length > 0) {
        for (let item of cartItems) {
          // Construct the POST request for each cart item
          var url22 = `https://localhost:44362/api/Cart/AddCartItem/${UserId}`;

          var data = {
            ProductId: item.product_id,
            Quantity: item.quantity,
          };

          let response = await fetch(url22, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        }
      }

      localStorage.removeItem("cartItems");

      var checkOut = localStorage.getItem("checkOut");
      if (checkOut != null) {
        window.location.href = "/htmldemo.net/dorno/dorno/cart.html";
      } else {
        window.location.href = "/htmldemo.net/dorno/dorno/index.html";
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error during login. Please try again.");
    }
  });
} else {
  console.error("Login button not found");
}
