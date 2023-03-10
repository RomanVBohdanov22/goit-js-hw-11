import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { galleryFetch } from './js/galleryFetch';

const formLnk = document.querySelector(".search-form");
const gallery = document.querySelector('.gallery');

formLnk.addEventListener("submit", onSubmitBtn);

function onSubmitBtn(e) {
    e.preventDefault();
    const {
        elements: { searchQuery }
    } = e.currentTarget;
    if (!searchQuery.value) return console.log("Please, enter searchQuery!");
    let splittedLine = searchQuery.value.trim().split(' ');
    let joinedLine = splittedLine.join('+');
    console.log(`${joinedLine}`); 
    galleryFetch(joinedLine).then(data => {renderData(data);
});
}

function renderData(dataResponse) { 
    console.log("this is renderData");
    gallery.innerHTML = "";
    const hitsArray = dataResponse.data.hits;
    if (hitsArray.length === 0) return;
    console.log(hitsArray[0]);
 //previewURL
    const galleryMurkup = hitsArray.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
        return `<a class="gallery__item" href="${largeImageURL}"><div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div></a>`; }
    ).join('');
    gallery.insertAdjacentHTML('afterbegin', galleryMurkup);
    
var lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});
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