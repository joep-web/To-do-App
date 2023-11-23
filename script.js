// Constants
const SCROLL_THRESHOLD = 150;

const checkboxArr = []; // outside kase kung nasa loob mareredeclare lang to everytime mag cclick which will result sa isang item lang sa array
let timeoutId; // sa hold note item func

// DOM Elements
const bodyElement = document.body;

const main = document.querySelector("main");

const toDosCont = document.querySelector(".cont-for-to-dos");
  
const responsiveTitle = document.querySelector(".responsiveTitle");
const contForTitle = document.querySelector(".contForTitle");

const noteCount = document.querySelector(".noteCount");

const optionsCont = document.querySelector(".options-cont");

const threeDotImg = document.querySelector("img[src='options.svg']");

const threeDotBtn = document.querySelector("#three-dot-btn");

const optionMenu = document.querySelector(".option-menu");

const mainChildren = main.children; // live html collection 

const noteItemCount = toDosCont.children;

const newNoteCont = document.querySelector(".new-note");

const editNoteTitle = document.querySelector(".new-note-head span");

const inpt = document.querySelector('input[type="text"');

const addNote = document.querySelector("#addNote");

const closeNewNote = document.querySelector("#close-new-note");

const editOption = document.getElementById("Edit");

const selectAll = document.querySelector(".check");
selectAll.checked = false;

const checkboxes = document.querySelectorAll(".checkboxes");

const closeEdit = document.querySelector(".close-edit");

const checkmarkAddNote = document.querySelector("#checkmark-button ");

// note count dynamic
noteCount.innerText = `${noteItemCount.length} to-dos`;

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
  optionMenu.style.transform = "scaleY(1)";
}

function handleNoteItemClick(e) {
  if (e.target.classList.contains("noteItem")) {
    e.stopPropagation();
    toggleNewNoteHidden();
    editNoteTitle.innerText = "Edit To-Do";
    inpt.value = e.target.innerText;
    inpt.focus();
    checkmark();
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
    checkmark();
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
  addNote.classList.toggle("hidden");
}

// Additional Helper Functions

function editOptionClickActions() {
  responsiveTitle.innerText = "Select items";
  threeDotBtn.classList.toggle("hidden");
  threeDotImg.classList.toggle("hidden");
  optionMenu.classList.toggle("hidden-option");
  selectAll.classList.toggle("hidden")
  closeEdit.classList.toggle("hidden");
  addNote.classList.toggle("hidden");
  noteCount.innerText = "";
}

function cancelEditClick() {
  responsiveTitle.innerText = "To-dos";
  threeDotBtn.classList.toggle("hidden");
  threeDotImg.classList.toggle("hidden");
  selectAll.classList.toggle("hidden");
  closeEdit.classList.toggle("hidden");
  noteCount.innerText = `${noteItemCount.length} to-dos`;
  checkboxes.forEach((circle) =>{
      circle.style.position = "relative";
      circle.style.right = "auto";
      circle.style.top = "auto";
      if (circle.checked === true) {
        circle.checked = false;
        checkboxArr.length = 0;
      };
    });
  if (selectAll.checked === true) {
     selectAll.checked = false;
  };
};

function selectAllFunc() {
  checkboxArr.length = 0;
  if (selectAll.checked === true) {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = true;
      responsiveTitle.innerText = "All selected";
      checkboxArr.push(checkbox);
    });
  } else {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
      responsiveTitle.innerText = "Select items"
    });
  }
  console.log(checkboxArr);
};


function eachCheckbox () {
  if(this.checked === true && this.style.position === "relative"){
    //yung bababa
  } else if(this.style.position === "absolute"){
    if (this.checked === true) {
      checkboxArr.push(this);
    } else {
        checkboxArr.pop();  
    };

    responsiveTitle.innerText = `${checkboxArr.length} selected`;
    
    if (checkboxArr.length === 0) {
      responsiveTitle.innerText = `Select items`;
    } else if(checkboxes.length === checkboxArr.length) {
      responsiveTitle.innerText = "All selected";
      selectAll.checked = true;
    } else if(checkboxes.length > checkboxArr.length && selectAll.checked === true) {
      selectAll.checked = false;
    };
  };
};


function mainEventHandler(e) {
  if(e.target.classList.contains("noteItem") && Array.from(checkboxes).every(cb => cb.style.position === "absolute")){
    let box = e.target.querySelector(".checkboxes");
    box.click();
  } else if(e.target.classList.contains("checkboxes") && Array.from(checkboxes).every(cb => cb.style.position === "relative")){
    
  } else {
    handleNoteItemClick(e);
  };
};

function touchstart(e) {
    timeoutId = setTimeout(function () {
      editOption.click();
      optionMenu.classList.toggle("hidden-option");
      let someVar = e.target.querySelector(".checkboxes");
      someVar.click();
    }, 1000);
};

function checkmark() {
  if (inpt.value === "") {
  checkmarkAddNote.disabled = true;
} else {
  checkmarkAddNote.disabled = false;
  }
};


// Event Listeners
window.addEventListener("scroll", navbarScroll);

window.addEventListener("scrollend", navbarScrollEnd);

threeDotBtn.addEventListener("click", toggleOptionHidden);

closeNewNote.addEventListener("click", toggleNewNoteHidden);

addNote.addEventListener("click", handleAddNoteClick);

editOption.addEventListener("click", handleEditOptionClick);

closeEdit.addEventListener("click", handleCloseEditClick);

selectAll.addEventListener("click", selectAllFunc);

checkboxes.forEach((checkbox) => checkbox.addEventListener("click", eachCheckbox));

main.addEventListener("click", mainEventHandler);

Array.from(mainChildren).forEach(child => { 
  child.addEventListener('touchstart', touchstart)});

Array.from(mainChildren).forEach(child => { 
  child.addEventListener('touchend',() => {
    clearTimeout(timeoutId);
})});

inpt.addEventListener("input", checkmark);

console.log(closeNewNote.nextElementSibling.innerText);
