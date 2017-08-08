import {
  SEARCH_BOOKS,
  ADD_BOOK_TO_WANT_TO_READ,
  ADD_BOOK_TO_CURRENTLY_READING,
  ADD_BOOK_TO_READ,
  REMOVE_BOOK_FROM_LISTS,
  RESET_FETCH_BOOKS,
} from '../actions';

import { Map, List, fromJS } from 'immutable';

const initialState = Map({
  searchBooks: List(),
  wantToReadBooks: List(),
  currentlyReadingBooks: List(),
  readBooks: List(),
});

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_BOOKS:
      return state.setIn(['searchBooks'], fromJS(action.payload));
    case RESET_FETCH_BOOKS:
      return state.setIn(['searchBooks'], List());
    case ADD_BOOK_TO_READ:
      return (
        state
          .set(
            'currentlyReadingBooks',
            state
              .get('currentlyReadingBooks')
              .filterNot(book => book.get('id') === action.book.get('id')),
          )
          .set(
            'wantToReadBooks',
            state
              .get('wantToReadBooks')
              .filterNot(book => book.get('id') === action.book.get('id')),
          )
          .updateIn(['readBooks'], list => list.push(Map(action.book)))
      );
    case ADD_BOOK_TO_WANT_TO_READ:
      return (
        state
          .set(
            'readBooks',
            state
              .get('readBooks')
              .filterNot(book => book.get('id') === action.book.get('id')),
          )
          .set(
            'currentlyReadingBooks',
            state
              .get('currentlyReadingBooks')
              .filterNot(book => book.get('id') === action.book.get('id')),
          )
          .updateIn(['wantToReadBooks'], list => list.push(Map(action.book)))
      );
    
    case ADD_BOOK_TO_CURRENTLY_READING:
      return (
        state
          .set(
            'readBooks',
            state
              .get('readBooks')
              .filterNot(book => book.get('id') === action.book.get('id')),
          )
          .set(
            'wantToReadBooks',
            state
              .get('wantToReadBooks')
              .filterNot(book => book.get('id') === action.book.get('id')),
          )
          .updateIn(['currentlyReadingBooks'], list =>
            list.push(Map(action.book)))
      );
    case REMOVE_BOOK_FROM_LISTS:
      return (
        state
        .set(
          'readBooks',
          state
          .get('readBooks')
          .filterNot(book => book.get('id') === action.book.get('id')),
        )
        .set(
          'wantToReadBooks',
          state
          .get('wantToReadBooks')
          .filterNot(book => book.get('id') === action.book.get('id')),
        )
        .set(
          'currentlyReadingBooks',
          state
          .get('currentlyReadingBooks')
          .filterNot(book => book.get('id') === action.book.get('id')),
        )
      );
    default:
      return state;
  }
}
