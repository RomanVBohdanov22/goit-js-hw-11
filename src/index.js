import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { galleryFetch } from './js/galleryFetch';

const formLnk = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreLnk = document.querySelector('.load-more');

let currentPage = 1;
let currentHits = 0;
let globalSearchQuery = '';
//

formLnk.addEventListener('submit', onSubmitBtn);

loadMoreLnk.addEventListener('click', onLoadMoreBtn);
loadMoreLnk.classList.add('hidden');

function onSubmitBtn(e) {
  e.preventDefault();
    currentPage = 1;
    currentHits = 0;
  const {
    elements: { searchQuery },
  } = e.currentTarget;

  if (searchQuery.value.trim().length === 0) {
    loadMoreLnk.classList.add('hidden');
    gallery.innerHTML = '';
    Notify.failure('Please, enter searchQuery!');
    return;
  }
  let splittedLine = searchQuery.value.trim().split(' ');
  let joinedLine = splittedLine.join('+');
  console.log(`${joinedLine}`);
  globalSearchQuery = joinedLine;
  galleryFetch(globalSearchQuery, currentPage).then(data => {
    renderData(data);
  });
}

function renderData(dataResponse) {
  console.log('this is renderData');
  gallery.innerHTML = '';
  const hitsArray = dataResponse.data.hits;
  loadMoreLnk.classList.add('hidden');
  if (dataResponse.data.totalHits <= 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  Notify.success(`Hooray! We found ${dataResponse.data.totalHits} images. 
  ${dataResponse.data.hits.length}img.@ pg.${currentPage}`);

  Notify.info(`Page: ${currentPage}`);
  const galleryMurkup = readDataArray(hitsArray);
  gallery.insertAdjacentHTML('afterbegin', galleryMurkup);

  var lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
  });
    lightbox.refresh();
    //(((currentPage-1)*40)+dataResponse.data.hits.length) 
    currentHits += dataResponse.data.hits.length;
  if (currentHits >= dataResponse.data.totalHits) {
    Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
    globalSearchQuery = '';
    currentPage = 1;
  } else loadMoreLnk.classList.remove('hidden');
}

function readDataArray(hitsArray) {
  //previewURL
  return hitsArray
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
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
</div></a>`;
      }
    )
    .join('');
}

function onLoadMoreBtn() {
  if (globalSearchQuery === '') return;
  currentPage += 1;
  loadMoreLnk.classList.add('hidden');
  galleryFetch(globalSearchQuery, currentPage).then(data => {
    renderData(data);
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
