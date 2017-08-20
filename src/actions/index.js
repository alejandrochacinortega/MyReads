import { fromJS } from 'immutable';

export const SEARCH_BOOKS = 'SEARCH_BOOKS';
export const SEARCH_BOOKS_SUCCESS = 'SEARCH_BOOKS_SUCCESS';
export const ADD_BOOK_TO_WANT_TO_READ = 'ADD_BOOK_TO_WANT_TO_READ';
export const ADD_BOOK_TO_CURRENTLY_READING = 'ADD_BOOK_TO_CURRENTLY_READING';
export const ADD_BOOK_TO_READ = 'ADD_BOOK_TO_READ';
export const REMOVE_BOOK_FROM_LISTS = 'REMOVE_BOOK_FROM_LISTS';
export const RESET_FETCH_BOOKS = 'RESET_FETCH_BOOKS';
export const GET_ALL_BOOKS = 'GET_ALL_BOOKS';
export const GET_ALL_BOOKS_SUCCESS = 'GET_ALL_BOOKS_SUCCESS';
export const BOOK_UPDATED = 'BOOK_UPDATED';
export const BOOK_UPDATED_SUCCESS = 'BOOK_UPDATED_SUCCESS';

export function fetchBooks (query, callback) {
  return {
    type: SEARCH_BOOKS,
    query,
    callback,
  }
}

export function fetchAllBooks () {
  return {
    type: GET_ALL_BOOKS,
    payload: 'FRA',
  }
}

export function updateBook (book, shelf) {
  return {
    type: BOOK_UPDATED,
    book: fromJS(book),
    shelf,
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
    row,
  };
}