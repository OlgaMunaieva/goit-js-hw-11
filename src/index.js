import { handleSubmit, fetchPhotos, handleInput } from './js/function';
import { loadMoreBtn } from './js/function';
import debounce from 'lodash.debounce';
const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input');

console.log(loadMoreBtn);

formEl.addEventListener('submit', handleSubmit);

loadMoreBtn.button.addEventListener('click', fetchPhotos);

formEl.addEventListener(
  'input',
  debounce(handleInput, 300, {
    leading: true,
    trailing: false,
  })
);
