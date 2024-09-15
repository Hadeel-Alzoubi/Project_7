/** @format */
userID = localStorage.getItem("UserId");

async function submitEditProfile() {
  debugger;

  var form = document.getElementById("editProfileForm");
  const formData1 = new FormData(form);

  const formData = new FormData();

  formData.append("Name", document.getElementById("name").value);
  formData.append("Email", document.getElementById("email").value);
  formData.append("Password", document.getElementById("password").value);
  formData.append("Address", document.getElementById("addrress").value);
  formData.append("PhoneNumber", document.getElementById("phone-number").value);

  const confirmPassword = document.getElementById("confirm-password").value;
  if (formData.get("Password") !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await fetch(
      `https://localhost:44362/api/Users/EditUserProfile/${userID}`,
      {
        method: "PUT",
        body: formData1,
      }
    );

    if (response.ok) {
      alert("Profile updated successfully");
    } else {
      alert("Failed to update profile");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error updating profile");
  }
}

async function ShowUserInfo() {
  debugger;

  const user = await fetch(
    `https://localhost:44362/api/Users/showUserInfoByID/${userID}`
  );
  if (!user.ok) {
    console.error(`HTTP error! Status: ${user.status}`);
    return;
  }
  const userData = await user.json();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const adress = document.getElementById("addrress");
  const phone = document.getElementById("phone-number");

  name.value = userData.name;
  email.value = userData.email;
  adress.value = userData.address;
  phone.value = userData.phoneNumber;
}

ShowUserInfo();
