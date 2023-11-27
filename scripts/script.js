// imports
import {navbarScroll, navbarScrollEnd} from "./navbar.js";
import  {createItem, createNoteItem} from "./createNewNote.js";


//exports
export {toDosCont, noteCount, noteItemCount, toggleNewNoteHidden};
export {responsiveTitle, contForTitle, optionsCont, checkboxes};

//            Constants

const checkboxArr = []; // outside kase kung nasa loob mareredeclare lang to everytime mag cclick which will result sa isang item lang sa array

let timeoutId; // sa hold note item func

//            DOM Elements

const main = document.querySelector("main");

const toDosCont = document.querySelector(".cont-for-to-dos");
  
const responsiveTitle = document.querySelector(".responsiveTitle");
const contForTitle = document.querySelector(".contForTitle");

const noteCount = document.querySelector(".noteCount");

const optionsCont = document.querySelector(".options-cont");

const threeDotImg = document.querySelector("img[src='svgs-icon/options.svg']");

const threeDotBtn = document.querySelector("#three-dot-btn");

const optionMenu = document.querySelector(".option-menu");

const mainChildren = main.children; // live html collection 

const noteItemCount = toDosCont.children;

const newNoteCont = document.querySelector(".new-note");

const editNoteTitle = document.querySelector(".new-note-head span");

const inpt = document.querySelector('input[type="text"');

const addNote = document.querySelector(".addNote");

const closeNewNote = document.querySelector("#close-new-note");

const editOption = document.getElementById("Edit");

const selectAll = document.querySelector(".check");
selectAll.checked = false;

const checkboxes = document.getElementsByClassName("checkboxes");

const closeEdit = document.querySelector(".close-edit");

const checkmarkAddNote = document.querySelector("#checkmark-button ");

const noteSpan = closeNewNote.nextElementSibling.innerText;
//           DOM elements





//         note count dynamic
noteCount.innerText = `${noteItemCount.length} to-dos`;
 




//            Functions

function toggleOptionMenu() {
  optionMenu.classList.toggle("hidden-option");
};

function handleEditOptionClick(e) {
  if (e.target.id === "Edit") {
    responsiveTitle.innerText = "Select items";
    toggleOptionMenu();
    toggles();
    noteCount.innerText = "";
    
    for(let cb of checkboxes) {
      cb.style.position = "absolute";
      cb.style.right = "3px";
      cb.style.top = "10%";
      if (cb.checked === true) {
        cb.checked = false;
      };
    };
  };
};

function toggles() {
  threeDotBtn.classList.toggle("hidden");
  threeDotImg.classList.toggle("hidden");
  selectAll.classList.toggle("hidden")
  closeEdit.classList.toggle("hidden");
  addNote.classList.toggle("hidden");
};


function cancelEditClick() {
  responsiveTitle.innerText = "To-dos";
  noteCount.innerText = `${noteItemCount.length} to-dos`;
  toggles();
  
  for (let cb of checkboxes) {
    cb.style.position = "relative";
    cb.style.right = "auto";
    cb.style.top = "auto";
    if (cb.checked === true) {
      cb.checked = false;
      checkboxArr.length = 0;
    };
  };
  
  if (selectAll.checked === true) {
     selectAll.checked = false;
  };
};

function selectAllFunc() {
  if (selectAll.checked === true) {
    for(let cb of checkboxes) {
      cb.checked = true;
      responsiveTitle.innerText = "All selected";
      checkboxArr.push(cb);
    };
  } else {
    for(let cb of checkboxes){
      cb.checked = false;
      responsiveTitle.innerText = "Select items";
      checkboxArr.length = 0;
    };
  };
  console.log(checkboxArr);
};

//    note item
function noteItemClick(e) {
    toggleNewNoteHidden();
    editNoteTitle.innerText = "Edit To-Do";
    inpt.value = e.target.innerText;
    inpt.focus();
    checkmark();
}

function toggleNewNoteHidden() {
  newNoteCont.classList.toggle("hidden");
}

function addNoteBtnClick(event) {
  if (event.target.classList.contains("addNote") || event.target.id === "close-new-note") {
    editNoteTitle.innerText = "New To-Do";
    toggleNewNoteHidden();
    inpt.focus();
    inpt.value = "";
    checkmark();
  }
}

//     function on checkboxes
function eachCheckbox (b) { 
  if(b.checked === true){
      checkboxArr.push(b);
    } else {
      checkboxArr.pop();
    };

  responsiveTitle.innerText = `${checkboxArr.length} selected`;
    
    if (checkboxArr.length === 0) {
      responsiveTitle.innerText = `Select items`;
      selectAll.checked = false;
    } else if(checkboxArr.length < checkboxes.length){
      selectAll.checked = false;
    } else if(checkboxArr.length === checkboxes.length){
      responsiveTitle.innerText = "All selected";
      selectAll.checked = true;
    };
};



// main event handler using evenr delegation
function mainEventHandler(e) {
  let box;

  if (e.target.classList.contains("noteItem")) {
    box = e.target.querySelector(".checkboxes");
    if (box.style.position === "absolute") {
      box.click();
    } else if(box.style.position === "relative"){
      noteItemClick(e);
    };
  } else if (e.target.classList.contains("checkboxes")){
    box = e.target;
    if (box.style.position === "absolute") {
    eachCheckbox(box);
    }; // else if dito is mattriger yung function para mapunta sa done notes yung nacheck
  };
};




// trigger select items when you hold a note item
function touchstart(e) {
  timeoutId = setTimeout(function () {
    editOption.click();
    optionMenu.classList.toggle("hidden-option");
    let someVar = e.target.querySelector(".checkboxes");
    if(someVar.checked === false){
      someVar.checked = true;
    };
    eachCheckbox(someVar);
  }, 1000);
};

// feature on checkmark btn when its empty
function checkmark() {
  if (inpt.value === "") {
  checkmarkAddNote.disabled = true;
} else {
  checkmarkAddNote.disabled = false;
  }
};



//          Event Listeners
window.addEventListener("scroll", navbarScroll);

window.addEventListener("scrollend", navbarScrollEnd);

threeDotBtn.addEventListener("click", toggleOptionMenu);

closeNewNote.addEventListener("click", toggleNewNoteHidden);

addNote.addEventListener("click", addNoteBtnClick);

editOption.addEventListener("click", handleEditOptionClick);

closeEdit.addEventListener("click", cancelEditClick);

selectAll.addEventListener("click", selectAllFunc);

main.addEventListener("click", mainEventHandler);

for(let mChildren of mainChildren){
  mChildren.addEventListener('touchstart', touchstart);
};

for(let mChildren of mainChildren){
  mChildren.addEventListener('touchend', () => {
    clearTimeout(timeoutId);
  });
};

inpt.addEventListener("input", checkmark);

checkmarkAddNote.addEventListener("click", () => {
  createNoteItem(createItem);
  window.localStorage.setItem("notes", inpt.value);
});
