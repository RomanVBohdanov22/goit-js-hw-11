const axios = require('axios').default;
KEY = '?key=34203020-9ccd90725bbcf7c5b689f6c58&q=';
BASE_URL = 'https://pixabay.com/api/';
FIELDS ='&image_type=photo&page=1&per_page=5';

export async function galleryFetch(queryLine) { 

    const searchUrl = BASE_URL + KEY + queryLine + FIELDS;
    console.log('searchUrl:');
    console.log(searchUrl);
    //return searchUrl;
    try {
        let response = await axios.get(searchUrl);
        console.log(response);
        console.log(response.data.hits);
        console.log(response.data.hits.map(({ largeImageURL }) => { return largeImageURL; })[0]);
    }
    catch (e) { 
        console.error(e);
    }

}

//https://pixabay.com/api/?key=34203020-9ccd90725bbcf7c5b689f6c58&q=yellow+flowers&image_type=photo
//https://pixabay.com/api/?key=34203020-9ccd90725bbcf7c5b689f6c58&q=yellow+flowers&image_type=photo&page=1&per_page=4


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

  /*
// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
   */