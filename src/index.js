import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import OnlyScroll from 'only-scrollbar';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { galleryFetch } from './js/galleryFetch';
import { readDataArrayToMarcup } from './js/dataToMarcup';

const formLnk = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreLnk = document.querySelector('.load-more');

let currentPage = 1;
let currentHits = 0;
let globalSearchQuery = '';

//const scroll = new OnlyScroll(document.querySelector('.scroll-container'));
const scroll = new OnlyScroll(gallery, {
    damping: 0.8,
    eventContainer: window
});
//

  var lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
  });

formLnk.addEventListener('submit', onSubmitBtn);

loadMoreLnk.addEventListener('click', onLoadMoreBtn);
loadMoreLnk.classList.add('hidden');

function onSubmitBtn(e) {
  e.preventDefault();

  currentPage = 1;
  currentHits = 0;
  gallery.innerHTML = '';

  const {
    elements: { searchQuery },
  } = e.currentTarget;

  globalSearchQuery = searchQuery.value.trim();
  if (globalSearchQuery.length === 0) {
    loadMoreLnk.classList.add('hidden');
    Notify.failure('Please, enter searchQuery!');
    return;
  } 

  operateDataBackEnd(globalSearchQuery, currentPage);
}

async function operateDataBackEnd(searchQuery, searchPage) { 
  try { 
    const data = await galleryFetch(searchQuery, searchPage);
    await renderData(data);
  }
  catch (e) { 
    Notify.failure(e.message);
  }
}

async function renderData(dataResponse) {  
  //gallery.innerHTML = '';
  const hitsArray = dataResponse.hits;
  const totalHitsValue = dataResponse.totalHits;
  loadMoreLnk.classList.add('hidden');
  if (totalHitsValue <= 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
 
  const galleryMurkup = await readDataArrayToMarcup(hitsArray);
  gallery.insertAdjacentHTML('beforeend', galleryMurkup); //'afterbegin'

  if (currentPage === 1) {
    Notify.success(`Hooray! We found ${totalHitsValue} images.`);  
  }

  lightbox.refresh();
  scroll.destroy();
    scrollMod();
  
    currentHits += hitsArray.length;
    Notify.info(`Page: ${currentPage}; ${currentHits} from ${totalHitsValue}; Query: "${globalSearchQuery}"`);
  if (currentHits >= totalHitsValue) {
    Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  } else loadMoreLnk.classList.remove('hidden');
}

function onLoadMoreBtn() {
  if (globalSearchQuery === '') return;
  currentPage += 1;
  loadMoreLnk.classList.add('hidden');
  operateDataBackEnd(globalSearchQuery, currentPage);

}

function scrollMod()
{ 
  const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}


