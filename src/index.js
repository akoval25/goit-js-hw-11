import './sass/main.scss';
import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import CardService from './js/card';
import LoadMoreBtn from './js/load-more-btn';
import cardTpl from './templates/cards.hbs';

const formRef = document.querySelector('.search-form');
const galleryRef = document.querySelector('.gallery');
const btnRef = document.querySelector('.btn');
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const cardService = new CardService();

formRef.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);

function onSearch(e) {
  e.preventDefault();
  
  const {
    elements: { searchQuery }
  } = e.currentTarget;
  
  clearCardsContainer();
  cardService.query = searchQuery.value;

  if (cardService.query.trim() === '') {
    return Notiflix.Notify.failure('Введить щось');
  }

  loadMoreBtn.show();
  cardService.resetPage();
  fetchHits();
}

function fetchHits() {
  loadMoreBtn.disable();
  cardService.fetchCards()
  .then(data => {
    if (data.hits.length === 0) {
      loadMoreBtn.hide();
      return Notiflix.Notify.failure('☠️ Нічого такого не знайшли');
    } 
    appendCardsMarkup(data);
    loadMoreBtn.enable();
    });
}

function appendCardsMarkup(data) {
  galleryRef.insertAdjacentHTML('beforeend', cardTpl(data.hits));
  return Notiflix.Notify.success(`👻 Що маємо, то маємо! А маємо ${data.total} зображень...`);
}

function clearCardsContainer() {
  galleryRef.innerHTML = '';
}

// Notiflix.Notify.success('Sol lucet omnibus');

// Notiflix.Notify.failure('Qui timide rogat docet negare');
// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }
 var lightbox = new SimpleLightbox('.gallery .photo-card img', { captionsData: 'alt', captionDelay: 250 });