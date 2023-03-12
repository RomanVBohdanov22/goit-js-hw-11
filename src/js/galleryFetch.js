import { Notify } from 'notiflix/build/notiflix-notify-aio';
const axios = require('axios').default;
const BASE_URL = 'https://pixabay.com/api/?key=';
const KEY = '34203020-9ccd90725bbcf7c5b689f6c58';
let PER_PAGE = 40;

export async function galleryFetch(queryLine, currentPage) { 

    try {
        let response = await axios.get(
            `${BASE_URL}${KEY}`, {
                params: {
                    q: `${queryLine}`,
                    orientation: `horizontal`,
                    image_type: `photo`,                    
                    page: currentPage,
                    per_page: PER_PAGE,
                    safesearch: `true`,
                }
            }
        ); 
        return response.data;
    }
    catch (e) { 
        Notify.failure(e.message);
    }

}

