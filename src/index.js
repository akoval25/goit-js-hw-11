import './sass/main.scss';
import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import CardService from './js/card';
// import cardTpl from './js/cards';
import cardTpl from './templates/cards.hbs';

const formRef = document.querySelector('.search-form');
const galleryRef = document.querySelector('.gallery');
const btnRef = document.querySelector('.btn');
const cardService = new CardService();


formRef.addEventListener('submit', onSearch);
btnRef.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  
  const {
    elements: { searchQuery }
  } = e.currentTarget;
  
  cardService.query = searchQuery.value;
  cardService.resetPage();
  cardService.fetchCards().then(appendCardsMarkup);
}

function onLoadMore(e) {
  e.preventDefault();
  cardService.fetchCards().then(appendCardsMarkup);
}

function appendCardsMarkup(hits) {
  galleryRef.insertAdjacentHTML('beforeend', cardTpl(hits));
}


/* <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div> */


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
// var lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });