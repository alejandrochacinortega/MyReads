import { combineReducers } from 'redux';
import booksReducer from './reducer_books';

const rootReducer = combineReducers({
  books: booksReducer
});

export default rootReducer