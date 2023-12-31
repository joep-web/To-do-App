import {toDosCont, noteCount, noteItemCount, everyNoteItem} from "./script.js"
export {createItem, createNoteItem};



const createItem = {
  innerInput: {
    tagName: "input",
    type: "checkbox",
    className: "checkboxes"
  },
  parentDiv: {
    tagName: "div",
    className: "noteItem"
  },
  span: {
    tagName: "span",
  }
};

function createNoteItem(createObj, text) {
  const newDiv = document.createElement(createObj.parentDiv.tagName);
  const newCb = document.createElement(createObj.innerInput.tagName);
  const newSpan = document.createElement(createObj.span.tagName);
  
  newDiv.className = createObj.parentDiv.className;
  newCb.type = createObj.innerInput.type;
  newCb.className = createObj.innerInput.className;
  newCb.style.position = "relative";
  toDosCont.append(newDiv);
  newDiv.append(newCb);
  newSpan.innerText = text;
  newDiv.append(newSpan);
  noteCount.innerText = `${noteItemCount.length} to-dos`;
  everyNoteItem.push(newDiv);
};