import Notiflix from 'notiflix';
import axios from "axios";
export default class CardService {
  constructor() { 
    this.searchData = '';
    this.page = 1;
  }
  
  fetchCards() {
    const key = "18248477-7327d67041c585aa7c82bab30";
    const url = `https://pixabay.com/api/?key=${key}&q=${this.searchData}&page=${this.page}&per_page=8`;

    return axios.get(url)
    .then(response => {
      this.incrementPage();
      return response.data;
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