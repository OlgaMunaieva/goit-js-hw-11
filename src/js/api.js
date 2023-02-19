import axios from 'axios';
import Notiflix from 'notiflix';

const URL = 'https://pixabay.com/api/';
const KEY = '33729301-f49fd51ce24dc6cb77317a085';

export const axiosPhoto = q => {
  return axios
    .get(
      `${URL}?key=${KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true
`
    )
    .then(function (response) {
      console.log(response);
      console.log(response.data.totalHits);
      if (!response.data.totalHits) {
        throw new Error('No data');
      }
      return response;
    })
    .catch(function (error) {
      console.log(error);
      Notiflix.Notify.failure(
        `Sorry, there are no images matching your search query "${q}". Please try again.`
      );
    });
};
