import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SingleBook from '../../components/SingleBook';
import '../../App.css';
import { connect } from 'react-redux';
import { fetchBooks, addBookTo, resetFetchBooks } from '../../actions/index';

class SearchBooks extends Component {
  state = {
    query: '',
  };

  onSubmitForm = event => {
    event.preventDefault();
    const { query } = this.state;
    const { fetchBooks } = this.props;
    fetchBooks(query);
  };
  
  getDefaultSelected = book => {
    const { booksPosition } = this.props;
    const bookPosition = booksPosition.get(book.get('id'));
    return bookPosition ? bookPosition : 'none';
  };

  renderBooks = () => {
    const { query } = this.state;
    const {
      addBookTo,
      searchBooks,
    } = this.props;

    if (searchBooks.get('error')) {
      return <div><h1>No results for {query} - </h1></div>;
    }

    return (
      <ol className="books-grid">
        {searchBooks
          .map(book => (
            <SingleBook
              book={book}
              key={book.get('id')}
              addBookTo={row => addBookTo(row, book)}
              defaultSelected={this.getDefaultSelected(book)}
            />
          ))
          .toArray()}
      </ol>
    );
  };

  render() {
    const { query } = this.state;
    const { searchBooks, resetFetchBooks } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
            onClick={() => resetFetchBooks()}
          />
          <div className="search-books-input-wrapper">
            <form onSubmit={this.onSubmitForm}>
              <input
                type="text"
                value={query}
                placeholder="Search by title or author"
                onChange={event => this.setState({ query: event.target.value })}
              />
            </form>
          </div>
        </div>
        <div className="search-books-results">
          {searchBooks.size > 0 && this.renderBooks()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ books }) {
  return {
    searchBooks: books.get('searchBooks'),
    wantToReadBooks: books.get('wantToReadBooks'),
    currentlyReadingBooks: books.get('currentlyReadingBooks'),
    readBooks: books.get('readBooks'),
    booksPosition: books.get('booksPosition')
  };
}

export default connect(mapStateToProps, {
  fetchBooks,
  addBookTo,
  resetFetchBooks,
})(SearchBooks);
