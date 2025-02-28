const nameinput = document.getElementById("name");
const emailUp = document.getElementById("emailUp");
const passwordUp = document.getElementById("passwordUp");
const confirmPassword = document.getElementById("confirmPassword");
const signUpButton = document.getElementById("signUpButton");
const emailIn = document.getElementById("emailIn");
const passwordIn = document.getElementById("passwordIn");
const signInButton = document.getElementById("signinbtn");
//sign up handling
signUpButton?.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    nameinput.value === "" ||
    emailUp.value === "" ||
    passwordUp.value === "" ||
    confirmPassword.value === ""
  ) {
    alert("Please fill in all fields");
    return;
  }
  if (passwordUp.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  } else {
    localStorage.setItem("name", nameinput.value);
    localStorage.setItem("email", emailUp.value);
    localStorage.setItem("password", passwordUp.value);
    window.location.href = "signin.html";
  }
});
//sign in handling
signInButton?.addEventListener("click", (e) => {
  e.preventDefault();
  if (emailIn.value === "" || passwordIn.value === "") {
    alert("Please fill in all fields");
    return;
  } else if (localStorage.getItem("email") === null) {
    alert("Please sign up first");
    window.location.href = "signup.html";
  } else if (
    emailIn.value === localStorage.getItem("email") &&
    passwordIn.value === localStorage.getItem("password")
  ) {
    window.location.href = "index.html";
  } else {
    alert("Incorrect email or password");
  }
});
