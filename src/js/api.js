import axios from 'axios';

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
