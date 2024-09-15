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
        Name: displayName,
        Email: email,
        Password: uid, // Using UID for password here, but consider using a real password system
        ConfirmPassword: uid, // This is the same as password
      };

      // Define the API URL
      const url = "https://localhost:44362/api/Users/register";

      // Make the POST request using fetch
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Important: tell the server you're sending form data
        },
        body: new URLSearchParams(userData).toString(), // Convert the object to URL-encoded string
      });

      // Check if the response is OK (HTTP status 200)
      if (response.ok) {
        alert("Registration successful! Login In!");
        window.location.href = "/batool/login.html"; // Redirect to login page
      } else {
        alert("Error during registration. Please try again.");
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error during login. Please try again.");
    }
  });
} else {
  console.error("Login button not found");
}
