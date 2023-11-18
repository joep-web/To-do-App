// Constants
const SCROLL_THRESHOLD = 150;


// DOM Elements
const bodyElement = document.body;

const main = document.querySelector("main");
const responsiveTitle = document.querySelector(".responsiveTitle");
const contForTitle = document.querySelector(".contForTitle");

const noteCount = document.querySelector(".noteCount");

const optionsCont = document.querySelector(".options-cont");

const threeDotImg = document.querySelector("img[src='options.svg']");

const threeDotBtn = document.querySelector("#three-dot-btn");

const optionMenu = document.querySelector(".option-menu");

const mainChildren = main.children;

const newNoteCont = document.querySelector(".new-note");

const editNoteTitle = document.querySelector(".new-note-head span");

const inpt = document.querySelector('input[type="text"');

const addNote = document.querySelector("#addNote");

const closeNewNote = document.querySelector("#close-new-note");

const editOption = document.getElementById("Edit");

const selectAll = document.querySelector(".check");

const checkboxes = document.querySelectorAll(".checkboxes");

const closeEdit = document.querySelector(".close-edit");


//note count dynamic
noteCount.innerText = `${mainChildren.length} to-dos`;

// Functions

function navbarScroll() {
  responsiveTitle.style.fontSize = "1.5rem";
  contForTitle.style.paddingTop = "5px";
  optionsCont.style.paddingBottom = "5px";
}

function navbarScrollEnd() {
  let shouldScroll = true;

  if (window.scrollY < 150) {
    if (shouldScroll == false) {
      //nothing
    } else {
      window.scroll({
        top: 0,
        behavior: "auto"
      });
      shouldScroll = false;
    }
    shouldScroll = true;
    responsiveTitle.style.fontSize = "2.2rem";
    contForTitle.style.paddingTop = "35px";
    optionsCont.style.paddingBottom = "35px";
  }
};

function toggleOptionHidden() {
  optionMenu.classList.toggle("hidden-option");
}

function handleNoteItemClick(e) {
  if (e.target.classList.contains("noteItem")) {
    toggleNewNoteHidden();
    editNoteTitle.innerText = "Edit To-Do";
    inpt.value = e.target.innerText;
    inpt.focus();
  }
}

function toggleNewNoteHidden() {
  newNoteCont.classList.toggle("hidden");
}

function handleAddNoteClick(event) {
  if (event.target.id === "addNote" || event.target.id === "close-new-note") {
    editNoteTitle.innerText = "New To-Do";
    toggleNewNoteHidden();
    inpt.focus();
    inpt.value = "";
  }
}

function handleEditOptionClick(e) {
  if (e.target.id === "Edit") {
    editOptionClickActions();
    checkboxes.forEach((circle) => {
      circle.style.position = "absolute";
      circle.style.right = "3px";
      circle.style.top = "10%";
      if (circle.checked === true) {
        circle.checked = false;
      }
    });
  }
}

function handleCloseEditClick() {
  cancelEditClick();
}

// Additional Helper Functions

function editOptionClickActions() {
  responsiveTitle.innerText = "Select items";
  threeDotBtn.classList.toggle("hidden");
  threeDotImg.classList.toggle("hidden");
  optionMenu.classList.toggle("hidden-option");
  selectAll.classList.toggle("hidden")
  closeEdit.classList.toggle("hidden");
  noteCount.innerText = "";
}

function cancelEditClick() {
  responsiveTitle.innerText = "To-dos";
  threeDotBtn.classList.toggle("hidden");
  threeDotImg.classList.toggle("hidden");
  selectAll.classList.toggle("hidden");
  closeEdit.classList.toggle("hidden");
  noteCount.innerText = `${mainChildren.length} to-dos`;
  checkboxes.forEach((circle) =>{
      circle.style.position = "relative";
      circle.style.right = "auto";
      circle.style.top = "auto";
      if (circle.checked === true) {
        circle.checked = false;
      };
    });
  if (selectAll.checked === true) {
     selectAll.checked = false;
  };
};

function selectAllFunc() {
  if (selectAll.checked === true) {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = true;
      responsiveTitle.innerText = "All selected"
    });
  } else {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
      responsiveTitle.innerText = "Select items"
    });
  }
};

function eachCheckbox () {
  if(this.checked === true && this.style.position === "relative"){
    //yung bababa
  } else if(this.checked === true && this.style.position === "absolute"){
      //dynamic header count of the checked boxes
      responsiveTitle.innerText = `${this.length.checked} selected`;
  }
}

// Event Listeners
window.addEventListener("scroll", navbarScroll);

window.addEventListener("scrollend", navbarScrollEnd);

threeDotBtn.addEventListener("click", toggleOptionHidden);

Array.from(mainChildren).forEach((noteItem) => noteItem.addEventListener("click", handleNoteItemClick
));

closeNewNote.addEventListener("click", toggleNewNoteHidden);

addNote.addEventListener("click", handleAddNoteClick);

editOption.addEventListener("click", handleEditOptionClick);

closeEdit.addEventListener("click", handleCloseEditClick);

selectAll.addEventListener("click", selectAllFunc);

checkboxes.forEach((checkbox) => checkbox.addEventListener("click", eachCheckbox));
