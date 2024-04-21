function redirect() {
  if (sessionStorage.getItem("userInfo")) {
    window.location.href = "../index.html";
  }
}

window.addEventListener("load", redirect);

function eyetoggle() {
  var passbar = document.getElementById("ePassword");
  var eye = document.getElementById("eye");

  if (passbar.type === "password") {
    passbar.type = "text";
    eye.className = "fa-solid fa-eye-slash";
  } else {
    passbar.type = "password";
    eye.className = "fa-solid fa-eye";
  }
}

const registerUser = async (name, email, password) => {
  console.log("hello");
  try {
    const response = await fetch("http://139.180.134.207:3000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if (response.status === 200) {
      alert("Thành công", "Tạo tài khoản thành công.");
      window.location = 'Login.html' 
    } else {
      alert("Tạo tài khoản thất bại!");
    }
  } catch (error) {
    console.error("Error handling registration: ", error);
    Alert.alert("Error", error.response.data);
  }
};

function validateForm() {

  const name = document.getElementById("uName").value;
  const email = document.getElementById("uEmail").value;
  const password = document.getElementById("uPassword").value;

  registerUser(name, email, password);
}

const submitBtn = document.getElementById("formId");
submitBtn.addEventListener("submit", function (event) {
  event.preventDefault();
  validateForm();
});
