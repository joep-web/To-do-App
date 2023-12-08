const back = document.querySelector("#back-home");

const toDevInfo = document.querySelector("#dev-info");

//          funcs

const backHome = () => {
  window.location.href ="../index.html";
};

const devClick = () => {
  window.location.href = "dev.html";
};


back.addEventListener("click", backHome);

toDevInfo.addEventListener("click", devClick);