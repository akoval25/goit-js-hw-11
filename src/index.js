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
// btnRef.addEventListener('click', onLoadMore);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);

function onSearch(e) {
  e.preventDefault();
  
  const {
    elements: { searchQuery }
  } = e.currentTarget;
  
  clearCardsContainer();
  cardService.query = searchQuery.value;

  if (cardService.query === '') {
    return Notiflix.Notify.failure('Введить щось');
  }

  loadMoreBtn.show();
  cardService.resetPage();
  fetchHits();
}

function fetchHits() {
  loadMoreBtn.disable();
  cardService.fetchCards().then(hits => {
    appendCardsMarkup(hits);
    loadMoreBtn.enable();
    });
}

function appendCardsMarkup(hits) {
  galleryRef.insertAdjacentHTML('beforeend', cardTpl(hits));
}

function clearCardsContainer() {
  galleryRef.innerHTML = '';
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