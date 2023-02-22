import { handleSubmit, fetchPhotos, handleInput } from './js/function';
import { loadMoreBtn } from './js/function';
import debounce from 'lodash.debounce';

const formEl = document.querySelector('.search-form');

formEl.addEventListener('submit', handleSubmit);

loadMoreBtn.button.addEventListener('click', fetchPhotos);

// formEl.addEventListener('input', handleInput);
