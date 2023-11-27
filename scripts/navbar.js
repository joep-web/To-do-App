import {responsiveTitle, contForTitle, optionsCont} from "./script.js"

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

export {navbarScroll, navbarScrollEnd};