import axios from 'axios';
// import Notiflix from 'notiflix';

const URL = 'https://pixabay.com/api/';
const KEY = '33729301-f49fd51ce24dc6cb77317a085';

export class AxiosPhotos {
  constructor() {
    this.page = 0;
    this.q = '';
  }
  async getPhotos() {
    this.nextPage();
    const response = await axios.get(
      `${URL}?key=${KEY}&q=${this.q}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40
`
    );
    if (!response.status) {
      throw new Error(response.status);
    }

    console.log(response);
    return response.data;
  }
  nextPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}

// = q => {
//   return axios
//     .get(
//       `${URL}?key=${KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40
// `
//     )
//     .then(function (response) {
//       console.log(response);
//       console.log(response.data.totalHits);
//       console.log(response.status);
//       if (!response.status) {
//         throw new Error(response.status);
//       }
//       return response;
//     })
//     .then(function (response) {
//       if (!response.data.totalHits) {
//         throw new Error('No data');
//       }
//       return response;
//     })
//     .catch(function (error) {
//       console.log(error);
//       Notiflix.Notify.failure(
//         `Sorry, there are no images matching your search query "${q}". Please try again.`
//       );
//     });
// };
