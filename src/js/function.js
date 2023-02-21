import { AxiosPhotos } from './api';
import { LoadMoreBtn } from './components/buttonUpload';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';

export const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

const gallery = document.querySelector('.gallery');
// console.log(gallery);

const axiosPhotos = new AxiosPhotos();
console.log(axiosPhotos);

// const activePicture = new SimpleLightbox('.gallery-item', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });
// activePicture.on('show.simplelightbox');

async function handleSubmit(event) {
  event.preventDefault();
  console.log(axiosPhotos.q);
  axiosPhotos.q = event.currentTarget.elements.searchQuery.value.trim();
  axiosPhotos.page = 0;
  console.log(axiosPhotos.q);
  const data = await processTheRequest();
  const markup = await createMarkupCardPhotos(data);
  cleanMarkup();
  const firstPhotos = await uploadMarkupFirst(markup);
  Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
  loadMoreBtn.isHidden = false;
  loadMoreBtn.show();
  loadMoreBtn.enable();
  console.log(axiosPhotos.page);
}

async function processTheRequest() {
  // console.log(axiosPhotos.getPhotos());
  try {
    const data = await axiosPhotos.getPhotos();
    if (!data.totalHits) {
      throw new Error('No data');
    }

    return data;
  } catch (error) {
    console.log(error);
    cleanMarkup();
    loadMoreBtn.isHidden = true;
    loadMoreBtn.hide();
    Notiflix.Notify.failure(
      `Sorry, there are no images matching your search query "${axiosPhotos.q}". Please try again.`
    );
  }
}

function createMarkupCardPhotos(arr) {
  const { hits } = arr;
  console.log(hits);
  // cleanMarkup();
  const markup = hits.reduce(
    (markup, namePhoto) => markup + createMarkupCardPhoto(namePhoto),
    ''
  );
  // console.log(markup);
  // gallery.insertAdjacentHTML('beforeend', markup);
  return markup;
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

function uploadMarkupFirst(markup) {
  gallery.innerHTML = markup;
}

async function fetchPhotos() {
  loadMoreBtn.disable();
  const data = await processTheRequest();
  console.log(axiosPhotos.page);
  console.log(data.totalHits);
  if ((axiosPhotos.page - 1) * 40 > data.totalHits) {
    Notiflix.Notify.info(
      `We're sorry, but you've reached the end of search results.`
    );
    loadMoreBtn.isHidden = true;
    loadMoreBtn.hide();
    return;
  }
  const markup = await createMarkupCardPhotos(data);
  const nextPhotos = await appendNewsToList(markup);
  // activePicture.refresh();
  loadMoreBtn.enable();
  return nextPhotos;
}

function appendNewsToList(markup) {
  gallery.insertAdjacentHTML('beforeend', markup);
}

function handleInput() {
  cleanMarkup();
  loadMoreBtn.isHidden = true;
  loadMoreBtn.hide();
}

export { handleSubmit, fetchPhotos, handleInput };
