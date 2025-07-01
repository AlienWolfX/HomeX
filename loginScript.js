import config from "./config.js";

// set title with DNS
document.title = `Login - ${window.location.hostname}`;

// focus input username/voucher
document.getElementById("username").focus();

// DOM var
const inputUsername = document.getElementById("username");
const inputPassword = document.getElementById("password");
const inputGroupUsername = document.getElementById("input-group-username");
const inputGroupPassword = document.getElementById("input-group-password");
const loginButton = document.querySelector("button[type=submit]");
const qrCodeInfo = document.getElementById("qrCodeInfo");
const qrCodeScannerURL = document.getElementById("qrCodeScannerURL");

// set URL QR Code Scanner
qrCodeScannerURL.addEventListener("click", (e) => {
  e.preventDefault();
  window.location = `intent:${config.qrCodeScannerURL}#Intent;end`;
});

// Commented for bugs
// set default menu active
// const defaultActiveMenu = document.getElementById(config.loginMethod.default);
// if (defaultActiveMenu) {
//   defaultActiveMenu.classList.add("login-method-active");
// } else {
//   console.error(`Element with id ${config.loginMethod.default} not found`);
// }

// hide menu with value false
const activeMenu = Object.keys(config.loginMethod).filter(
  (key) => config.loginMethod[key] === false
);
activeMenu.forEach((el) => {
  document.getElementById(el).style.display = "none";
});

// form formatter
function inputChangeHandler(e) {
  inputPassword.value = e.target.value;
}
const formFormatter = (menuName) => {
  if (menuName === "member") {
    inputGroupPassword.style.display = "block";
    inputGroupUsername.style.display = "block";
    inputUsername.placeholder = "Username";
    loginButton.style.display = "block";
    qrCodeInfo.style.display = "none";
    inputUsername.removeEventListener("input", inputChangeHandler);
  } else if (menuName === "voucher") {
    inputGroupUsername.style.display = "block";
    inputGroupPassword.style.display = "none";
    inputUsername.placeholder = "Voucher";
    loginButton.style.display = "block";
    qrCodeInfo.style.display = "none";
    inputUsername.addEventListener("input", inputChangeHandler);
  } else {
    qrCodeInfo.style.display = "block";
    inputGroupUsername.style.display = "none";
    inputGroupPassword.style.display = "none";
    loginButton.style.display = "none";
    inputUsername.removeEventListener("input", inputChangeHandler);
  }
};

/// init form based config default menu
formFormatter(config.loginMethod.default);

// Show Hide Input Password
// Moved to HTML

// Menu Login Method
const menus = document.querySelectorAll(".login-method-menu");
menus.forEach((menu) => {
  menu.addEventListener("click", function () {
    const currentActive = document.querySelectorAll(".login-method-active");
    currentActive[0].className = currentActive[0].className.replace(
      " login-method-active",
      ""
    );
    this.className += " login-method-active";

    // change form input based method
    const activeMenuId = this.id;
    formFormatter(activeMenuId);
  });
});
