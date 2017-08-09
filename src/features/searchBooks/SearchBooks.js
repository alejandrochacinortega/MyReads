import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { RingLoader } from 'halogen';

import SingleBook from '../../components/SingleBook';
import '../../App.css';
import '../../index.css';
import { connect } from 'react-redux';
import { fetchBooks, addBookTo, resetFetchBooks } from '../../actions/index';

class SearchBooks extends Component {
  state = {
    query: '',
    isFetchingData: false,
    finalSearch: '',
  };

  onSubmitForm = event => {
    event.preventDefault();
    const { query, finalSearch } = this.state;
    const { fetchBooks } = this.props;
    if (query.length === 0) {
      alert('Oppps...Search seems to be empty. You can try to search for HTML');
      return;
    }
    this.setState({ isFetchingData: true, finalSearch: query });
    fetchBooks(query).then(() => this.setState({ isFetchingData: false }));
  };

  getDefaultSelected = book => {
    const { booksPosition } = this.props;
    const bookPosition = booksPosition.get(book.get('id'));
    return bookPosition ? bookPosition : 'none';
  };
  
  renderBooks = () => {
    const { finalSearch } = this.state;
    const {
      addBookTo,
      searchBooks,
    } = this.props;

    if (searchBooks.get('error')) {
      return (
        <div style={{ color: '#26a65b' }}>
          <h2>
            {
              `No results for '${finalSearch}' :( But wait... How about some HTML knowledge? Search HTML`
            }
          </h2>
        </div>
      );
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
    const { query, isFetchingData } = this.state;
    const { searchBooks, resetFetchBooks } = this.props;

    if (isFetchingData) {
      return (
        <div className="center-text">
          <RingLoader color="#26a65b" size="96px" margin="4px" />;
        </div>
      );
    }

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
    booksPosition: books.get('booksPosition'),
  };
}

export default connect(mapStateToProps, {
  fetchBooks,
  addBookTo,
  resetFetchBooks,
})(SearchBooks);
