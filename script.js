const body = document.body;

//for when you add a new note
const newNoteCont = document.querySelector(".new-note");
const closeNewNote = document.querySelector("#close-new-note");
const addNote = document.querySelector("#addNote");

closeNewNote.addEventListener("click", () => {
  newNoteCont.classList.toggle("hidden");
});

addNote.addEventListener("click", (event) => {
  if(event.target.id === "addNote" || event.target.id === "close-new-note") {
    newNoteCont.classList.toggle("hidden");
  let inpt = document.querySelector('input[type="text"');
  inpt.focus();
  }
});

// for when you click the options at the top
const option = document.querySelector(".option-buttons");
const optionButton = document.querySelector("#eto");

optionButton.addEventListener("click", () => {
  option.classList.toggle("hidden-option");
});



//for the navbar resize feature

const main = document.querySelector("main");

// Get the elements to modify
const responsiveTitle = document.querySelector(".responsiveTitle");
const contForTitle = document.querySelector(".contForTitle");
const options = document.querySelector(".options");

//event

window.addEventListener("scroll", (event) => {
  responsiveTitle.style.fontSize = "1.5rem";
  contForTitle.style.paddingTop = "5px";
  options.style.paddingBottom = "5px";
});

window.addEventListener("scrollend", (event) => {
  let shouldScroll = true;
  
  if(window.scrollY < 50){
    if(shouldScroll == false){
      //nothing
    } else {
      window.scroll({
        top: 0,
        behavior: "auto"
      });
      shouldScroll = false;
    }
    shouldscroll = true;
    responsiveTitle.style.fontSize = "2.2rem";
    contForTitle.style.paddingTop = "35px";
    options.style.paddingBottom = "35px";
  }
});
