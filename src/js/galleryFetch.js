const axios = require('axios').default;
const BASE_URL = 'https://pixabay.com/api/?key=';
const KEY = '34203020-9ccd90725bbcf7c5b689f6c58';
const ABS_FIELFS = '&image_type=photo&orientation=horizontal&safesearch=true';

export async function galleryFetch(queryLine) { 
    let PAGE = 1;
    let PER_PAGE = 20;
    let FIELDS = ABS_FIELFS+`&page=${PAGE}&per_page=${PER_PAGE}`;
    const searchUrl = BASE_URL + KEY + '&q=' + queryLine + FIELDS;
    console.log(searchUrl);
    try {
        let response = await axios.get(searchUrl);
        return response;
    }
    catch (e) { 
        console.error(e);
    }

}

