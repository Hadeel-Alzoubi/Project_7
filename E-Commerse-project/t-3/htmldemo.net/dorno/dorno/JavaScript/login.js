/** @format */

async function Register() {
  event.preventDefault();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  var email = document.getElementById("EmailRegister").value;
  var password = document.getElementById("PasswordRegister").value;
  var confirmPassword = document.getElementById(
    "ConfirmPasswordRegister"
  ).value;

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  if (!passwordRegex.test(password)) {
    alert(
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    );
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const url = "https://localhost:44362/api/Users/register";
  var form = document.getElementById("RegisterForm");
  var formData = new FormData(form);

  console.log(formData.get("Name"));

  var response = await fetch(url, {
    method: "POST",
    body: formData,
  }).then((response) => {
    if (response.ok) {
      alert("Registration successful!, Login In!");

      window.location.href = "login.html";
    }
  });
}

/////////login//////////////////////////////////////////////////////////////////////////////////////

async function LoginUser() {
  event.preventDefault();
  const email = document.getElementById("EmailLogin").value.trim();
  const password = document.getElementById("PasswordLLogin").value.trim();

  if (email === "" || password === "") {
    Swal.fire({
      icon: "error",
      title: "Missing Fields",
      text: "Please fill in both email and password fields.",
    });
    return;
  }
  var form = document.getElementById("LoginForm");
  var formData = new FormData(form);

  try {
    const urlLogin = "https://localhost:44362/api/Users/login";

    let response = await fetch(urlLogin, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      var data = await response.json();

      localStorage.setItem("Token", data.token);
      localStorage.setItem("UserId", data.userId);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have logged in successfully!",
      });
      var cartItems = JSON.parse(localStorage.getItem("cartItems"));
      var userId = localStorage.getItem("UserId");

      if (cartItems && cartItems.length > 0) {
        for (let item of cartItems) {
          // Construct the POST request for each cart item
          var url22 = `https://localhost:44362/api/Cart/AddCartItem/${userId}`;

          var itemData = {
            ProductId: item.product_id,
            Quantity: item.quantity,
          };

          let response = await fetch(url22, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(itemData),
          });
        }
      }

      // Clear cart items from localStorage
      localStorage.removeItem("cartItems");

      // Redirect to appropriate page after login
      var checkOut = localStorage.getItem("checkOut");
      if (checkOut != null) {
        window.location.href = "/htmldemo.net/dorno/dorno/index.html";
      } else {
        window.location.href = "/htmldemo.net/dorno/dorno/cart.html";
      }
    } else {
      // Use SweetAlert to display an error message for failed login
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Please check your credentials and try again.",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    // Use SweetAlert to display an error message for the exception
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "An error occurred during login. Please try again.",
    });
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

// async function RegisterGoogle() {
//   // Retrieve the userdata from localStorage
//   var userdata = localStorage.getItem("user");
//   debugger;
//   // Parse the userdata string into a JSON object
//   var user = JSON.parse(userdata);
//   console.log(user);

//   // Create a new FormData object
//   const form = new FormData();

//   // Append the necessary fields from the parsed object
//   form.append("Name", user.displayName);
//   form.append("Email", user.email);
//   form.append("Password", user.uid);
//   form.append("ConfirmPassword", user.uid);

//   console.log(form);

//   // Define the API URL
//   const url = "https://localhost:44362/api/Users/register";

//   // Make the POST request using fetch
//   var response = await fetch(url, {
//     method: "POST",
//     body: form,
//   }).then((response) => {
//     if (response.ok) {
//       alert("Registration successful! Login In!");
//       window.location.href = "/batool/login.html";
//     }
//   });
// }

//////////////////////////////////////////////////////////////////////////////////////////////////
