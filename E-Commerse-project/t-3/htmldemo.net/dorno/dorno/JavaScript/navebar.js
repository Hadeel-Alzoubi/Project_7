/** @format */

function islogin() {
  const loginButton = document.getElementById("login");
  const userAccount = document.getElementById("userAccount");
  let userId = localStorage.getItem("UserId");

  if (userId != null) {
    loginButton.textContent = "Logout";
    loginButton.addEventListener("click", function () {
      localStorage.removeItem("UserId");
      localStorage.removeItem("Token");
      alert("You have successfully logged out.");

      loginButton.textContent = "Login";

      window.location.href = "/batool/login.html";
    });
  } else {
    loginButton.textContent = "Login";
    userAccount.style.display = "none";
    loginButton.addEventListener("click", function () {
      window.location.href = "/batool/login.html";
    });
  }
}

islogin();
