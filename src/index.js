import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { galleryFetch } from './js/galleryFetch';

const formLnk = document.querySelector(".search-form");
const gallery = document.querySelector('.gallery');
//console.log(formLnk);

formLnk.addEventListener("submit", onSubmitBtn);

function onSubmitBtn(e) {
    e.preventDefault();
    const {
        elements: { searchQuery }
    } = e.currentTarget;
    if (!searchQuery.value) return console.log("Please, enter searchQuery!");
    let splittedLine = searchQuery.value.trim().split(' ');
    let joinedLine = splittedLine.join('+');
    console.log(`inputLine ${searchQuery.value}`);
    console.log(`${splittedLine}`);
    console.log(`${joinedLine}`);
    //const galleryData = 
    //const galleryData = galleryFetch(joinedLine);//.map(({ largeImageURL, previewURL, tags }) => { return largeImageURL + " " + previewURL + " " + tags; });
    //console.log({largeImageURL, previewURL, tags});
    //console.log("gallery data ", galleryData);
    
    galleryFetch(joinedLine).then(data => {renderData(data);
});
}

function renderData(dataResponse) { 
    console.log("this is renderData");
    gallery.innerHTML = "";
    console.log(dataResponse.data.hits);
    const hitsArray = dataResponse.data.hits;
    console.log(hitsArray[0]);
 //previewURL
//largeImageURL
    const galleryMurkup = hitsArray.map(({ previewURL, tags, likes, views, comments, downloads }) => { return `<div class="photo-card">
  <img src="${previewURL}" alt="${tags}" loading="lazy" />
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
</div>`; }
    ).join('');
gallery.insertAdjacentHTML('afterbegin', galleryMurkup);
}

/*<!-- 
<div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>

-->*/

/*
const galleryMurkup = galleryItems
  .map(({ preview, original, description }) => {
    return `<li>
    <a class="gallery__item" href="${original}">
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
    </a>
    </li>
`;
  })
  .join('');

gallery.insertAdjacentHTML('afterbegin', galleryMurkup);

console.log(gallery);

var lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});
 */


/**
 const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
 */