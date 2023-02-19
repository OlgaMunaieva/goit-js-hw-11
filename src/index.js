import { handleSubmit } from './js/function';

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input');

formEl.addEventListener('submit', handleSubmit);
