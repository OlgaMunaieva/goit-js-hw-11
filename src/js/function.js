import { AxiosPhotos } from './api';
import Notiflix from 'notiflix';

const gallery = document.querySelector('.gallery');
console.log(gallery);

const axiosPhotos = new AxiosPhotos();
console.log(axiosPhotos);

function handleSubmit(event) {
  event.preventDefault();
  axiosPhotos.q = event.currentTarget.elements.searchQuery.value.trim();
  console.log(axiosPhotos.q);
  // const photos = axiosPhoto(namePhotos);
  // console.log(axiosPhoto(namePhotos));
  console.log(processTheRequest());
  processTheRequest().then(createMarkupCardPhots);
}

async function processTheRequest() {
  console.log(axiosPhotos.getPhotos());
  try {
    const response = await axiosPhotos.getPhotos();
    // const photos = await response.data;
    // .then(response => {
    //   console.log(response);
    //   console.log(response.data.totalHits);
    //   console.log(response.status);
    if (!response.status) {
      throw new Error(response.status);
    }
    // return response;
    // }
    // .then(function (response) {
    if (!response.data.totalHits) {
      throw new Error('No data');
    }
    return response;
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(
      `Sorry, there are no images matching your search query "${this.q}". Please try again.`
    );
  }
}

function createMarkupCardPhots(arr) {
  const { data } = arr;
  console.log(data);
  const { hits } = data;
  console.log(hits);
  cleanMarkup();
  // console.log(arr);
  const markup = hits.reduce(
    (markup, namePhoto) => markup + createMarkupCardPhoto(namePhoto),
    ''
  );
  console.log(markup);
  gallery.innerHTML = markup;
}

function createMarkupCardPhoto({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
  <a class="gallery-item" href="${largeImageURL}">
  <div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${likes}
        </p>
        <p class="info-item">
          <b>Views</b>${views}
        </p>
        <p class="info-item">
          <b>Comments</b>${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${downloads}
        </p>
      </div>
    </div>
    </a>
  `;
}

function cleanMarkup() {
  gallery.innerHTML = '';
}

export { handleSubmit };
