KEY = '34203020 - 9ccd90725bbcf7c5b689f6c58';
BASE_URL = 'https://pixabay.com/api/';

export function galleryFetch(line) { 

    const searchUrl = BASE_URL + line + FIELDS;
}

//https://pixabay.com/api/?key=34203020-9ccd90725bbcf7c5b689f6c58&q=yellow+flowers&image_type=photo


/*
fetch("https://jsonplaceholder.typicode.com/posts")
  .then(response => response.json())
  .then(posts => console.log(posts))
  .catch(error => console.log(error));
*/
/*
// Change this number to fetch different post
const postId = 1;

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
  .then(response => response.json())
  .then(post => console.log(post))
  .catch(error => console.log(error));
 */