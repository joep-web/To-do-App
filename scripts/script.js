//             imports
import {navbarScroll, navbarScrollEnd} from "./navbar.js";
import  {createItem, createNoteItem} from "./createNewNote.js";


//             exports
export {toDosCont, noteCount, noteItemCount, toggleNewNoteHidden};
export {responsiveTitle, contForTitle, optionsCont, checkboxes};

//            Constants

const checkboxArr = []; // outside kase kung nasa loob mareredeclare lang to everytime mag cclick which will result sa isang item lang sa array
const noteItemArr = [];

export const everyNoteItem = [];

let timeoutId; // sa hold note item func

const keyPattern = /^note_\d+/;

let key = 1;

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

const mainChildren = main.children; 

const noteItemCount = toDosCont.children;

const newNoteCont = document.querySelector(".new-note");

const editNoteTitle = document.querySelector(".new-note-head span");

const inpt = document.querySelector('input[type="text"');

const addNote = document.querySelector(".addNote");

const closeNewNote = document.querySelector("#close-new-note");

const editOption = document.getElementById("Edit");

const selectAll = document.querySelector(".check");

const checkboxes = document.getElementsByClassName("checkboxes");

const closeEdit = document.querySelector(".close-edit");

const checkmarkAddNote = document.querySelector("#checkmark-button ");
const fDiv = document.querySelector(".footer-div");

const deleteOpt = document.querySelector(".delete-opt");

const doneCont = document.querySelector(".cont-for-done-notes");

const countDone = document.querySelector(".done-count");

const doneNotes = document.querySelector(".done-notes");

const completed = document.querySelector("#Completed")

const settings = document.querySelector("#Settings");
//           DOM elements





//         note count dynamic
noteCount.innerText = `${noteItemCount.length} to-dos`;


//         load the saved notes
for (const key in localStorage) {
  if (keyPattern.test(key)) {
    createNoteItem(createItem, localStorage.getItem(key));
  };
};


//            Functions

function delOptOpacity() {
   if (checkboxArr.length === 0) {
     deleteOpt.style.opacity = "0.5";
     deleteOpt.style.pointerEvents = "none";
   } else {
      deleteOpt.style.opacity = "1";
     deleteOpt.style.pointerEvents = "auto";
   }
};


function toggleOptionMenu() {
  optionMenu.classList.toggle("hidden-option");
};


function toggles() {
  threeDotBtn.classList.toggle("hidden");
  threeDotImg.classList.toggle("hidden");
  selectAll.classList.toggle("hidden")
  closeEdit.classList.toggle("hidden");
  addNote.classList.toggle("hidden");
  fDiv.classList.toggle("hidden");
  deleteOpt.classList.toggle("hidden");
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


function cancelEditClick() {
  responsiveTitle.innerText = "To-dos";
  
  noteCount.innerText = `${everyNoteItem.length} to-dos`;
  
  toggles();
  
  for (let cb of checkboxes) {
    cb.style.position = "relative";
    cb.style.right = "auto";
    cb.style.top = "auto";
    
    if (cb.checked === true && cb.parentElement.parentElement.classList.contains("cont-for-to-dos")) {
      cb.checked = false;
    } else if(cb.checked === true || cb.checked === false && cb.parentElement.parentElement.classList.contains("done-notes")){
      cb.checked = true;
    };
  };
  
  checkboxArr.length = 0;

  selectAll.checked === true? selectAll.checked = false: undefined;
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
  delOptOpacity();
};


function toggleNewNoteHidden() {
  newNoteCont.classList.toggle("hidden");
  window.scroll({
    top: 0,
    behavior: "auto"
  });
};


function addNoteBtnClick(event) {
  if (event.target.classList.contains("addNote")) {
    editNoteTitle.innerText = "New To-Do";
    toggleNewNoteHidden(event);
    inpt.focus();
    inpt.value = "";
    checkmark();
  };
};


function checkMFunc() {
  if(editNoteTitle.innerText === "New To-Do"){
    createNoteItem(createItem, inpt.value);
    window.localStorage.setItem(`note_${key++} `, inpt.value);
    toggleNewNoteHidden();
  } else if(editNoteTitle.innerText === "Edit To-Do"){
    let nt = noteItemArr[0];
    
    for(let key in localStorage){
      if (localStorage.getItem(key) === nt.querySelector("span").innerText) {
        nt.querySelector("span").innerText = inpt.value;
        
        localStorage.setItem(key, inpt.value);
      };
    };
    
    toggleNewNoteHidden();
  };
};


// feature on checkmark btn when its empty
function checkmark() {
  inpt.value === ""? checkmarkAddNote.disabled = true: checkmarkAddNote.disabled = false;
};


//    note item
function noteItemClick(e) {
    toggleNewNoteHidden(e);
    editNoteTitle.innerText = "Edit To-Do";
    inpt.value = e.target.innerText;
    inpt.focus();
    checkmark();
};


//     function on checkboxes
function eachCheckbox (b) { 
  b.checked === true? checkboxArr.push(b): checkboxArr.pop();
  
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
  delOptOpacity();
};


//  main event handler using event delegation
function mainEventHandler(e) {
  let box;

  if (e.target.classList.contains("noteItem")) {
    box = e.target.querySelector(".checkboxes");
    if (box.style.position === "absolute") {
      box.click();
    } else if(box.style.position === "relative"){
      noteItemClick(e);
      noteItemArr.push(e.target);
      console.log(noteItemArr);
      if (noteItemArr.length > 1) {
  noteItemArr.shift();
};
    };
  } else if (e.target.classList.contains("checkboxes")){
    box = e.target;
    
    if (box.style.position === "absolute") {
    eachCheckbox(box);
    } else if(box.style.position === "relative"){
      
      box.checked === true? forDoneToDos(box): forNotDoneToDos(box);

      countDone.innerText = `done (${doneNotes.children.length})`;

      doneNotes.children.length >= 1? doneCont.classList.remove("hidden"): doneCont.classList.add("hidden");
      
    };
  };
};


function forDoneToDos(box) {
  let doneNote = box.closest(".noteItem");
  toDosCont.removeChild(doneNote);
  doneNotes.append(doneNote);
};

function forNotDoneToDos(box) {
  let doneNote = box.closest(".noteItem");
  doneNotes.removeChild(doneNote);
  toDosCont.append(doneNote);
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
  }, 500);
};


function deleteNote() {
  for(let cb of checkboxArr){
    cb.parentElement.remove();
    everyNoteItem.pop();
    doneNotes.children.length >= 1? doneCont.classList.remove("hidden"): doneCont.classList.add("hidden");
    countDone.innerText = `done (${doneNotes.children.length})`;

    for(let key in localStorage){
      if(cb.nextElementSibling.innerText === localStorage.getItem(key)){
        localStorage.removeItem(key);
      };
    };
  };
  cancelEditClick();
};



//          Event Listeners
window.addEventListener("scroll", navbarScroll);

window.addEventListener("scrollend", navbarScrollEnd);

threeDotBtn.addEventListener("click", toggleOptionMenu);

addNote.addEventListener("click", addNoteBtnClick);

closeNewNote.addEventListener("click", (e) => {
  toggleNewNoteHidden(e);
  noteItemArr.length = 0;
  console.log(noteItemArr);
});

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

checkmarkAddNote.addEventListener("click",checkMFunc);

deleteOpt.addEventListener("click", deleteNote);

completed.addEventListener("click", (e) => {
  if(e.target.innerText === "Hide completed"){
    e.target.innerText = "Show completed";
    doneCont.classList.add("hidden");
  } else {
    e.target.innerText = "Hide completed";
    doneCont.classList.remove("hidden");
  };
});


settings.addEventListener("click", () => {
  window.location.href = "settings/about.html";
});