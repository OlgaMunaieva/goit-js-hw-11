import { axiosPhoto } from './api';

const gallery = document.querySelector('.gallery');
console.log(gallery);

function handleSubmit(event) {
  event.preventDefault();
  const namePhotos = event.currentTarget.elements.searchQuery.value;
  console.log(namePhotos);
  // const photos = axiosPhoto(namePhotos);
  // console.log(axiosPhoto(namePhotos));
  axiosPhoto(namePhotos).then(createMarkupCardPhots);
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
