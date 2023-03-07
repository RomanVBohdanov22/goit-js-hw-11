import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formLnk = document.querySelector(".search-form");

//console.log(formLnk);

formLnk.addEventListener("submit", onSubmitBtn);

function onSubmitBtn(e) { 
    e.preventDefault();    
    const {
        elements: { searchQuery }
    } = e.currentTarget;

    if (!searchQuery.value) return console.log("Please, enter searchQuery!");
    console.log(`inputLine ${searchQuery.value}`);
    //e.currentTarget.reset();
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