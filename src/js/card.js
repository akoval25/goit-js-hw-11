import Notiflix from 'notiflix';
export default class CardService {
  constructor() { 
    this.searchData = '';
    this.page = 1;
  }
  
  fetchCards() {
  const key = "18248477-7327d67041c585aa7c82bab30";

  const url = `https://pixabay.com/api/?key=${key}&q=${this.searchData}&page=${this.page}&per_page=8`;

  return fetch(url)
    .then(r => r.json())
    .then(data => {
      this.incrementPage();
      return data;
  });
  }

  

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchData;
  }

  set query(newData) {
    this.searchData = newData;
  }
}