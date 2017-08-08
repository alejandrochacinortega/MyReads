import * as BooksAPI from '../BooksAPI'

export const SEARCH_BOOKS = 'SEARCH_BOOKS';
export const ADD_BOOK_TO_WANT_TO_READ = 'ADD_BOOK_TO_WANT_TO_READ';
export const ADD_BOOK_TO_CURRENTLY_READING = 'ADD_BOOK_TO_CURRENTLY_READING';
export const ADD_BOOK_TO_READ = 'ADD_BOOK_TO_READ';
export const REMOVE_BOOK_FROM_LISTS = 'REMOVE_BOOK_FROM_LISTS';
export const RESET_FETCH_BOOKS = 'RESET_FETCH_BOOKS';

export function fetchBooks (query) {
  const request = BooksAPI.search(query, 20);
  return {
    type: SEARCH_BOOKS,
    payload: request
  }
}

export function resetFetchBooks () {
  return {
    type: RESET_FETCH_BOOKS,
  }
}

export function addBookTo (row, book) {
  let type;
  switch (row) {
    case 'currentlyReading':
      type = ADD_BOOK_TO_CURRENTLY_READING;
      break;
    case 'wantToRead':
      type = ADD_BOOK_TO_WANT_TO_READ;
      break;
    case 'read':
      type = ADD_BOOK_TO_READ;
      break;
    case 'none':
      type = REMOVE_BOOK_FROM_LISTS;
  }
  
  return {
    type,
    book,
  };
}