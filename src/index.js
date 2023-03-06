const formLnk = document.querySelector(".search-form");

console.log(formLnk);

formLnk.addEventListener("submit", onSubmitBtn);

function onSubmitBtn(e) { 
    e.preventDefault();    

}

/**
 const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
 */