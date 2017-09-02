import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RingLoader } from 'halogen';

import '../../App.css';
import SingleBook from '../../components/SingleBook';
import { addBookTo, fetchAllBooks, updateBook } from '../../actions';

class MyReads extends Component {
  
  /**
   * @description Set the select default value for book
   * @constructor
   * @param {Map} book - Immutable Map of the book
   * @returns {string} Select value for the book
   */
  getDefaultSelected = book => {
    const { booksPosition } = this.props;
    const bookPosition = booksPosition.get(book.get('id'));
    return bookPosition ? bookPosition : 'none';
  };
  
  /**
   * @description Render books from the search
   * @constructor
   * @param none
   * @returns XML
   */
  renderBooks = () => {
    const {
      addBookTo,
      allBooks,
    } = this.props;
    
    return (
      <ol className="books-grid">
        {allBooks
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
  
  componentDidMount() {
    setTimeout(() => {
      this.props.fetchAllBooks();
    })
  }
  
  updateBook = (book, row ) => {
    const { updateBook } = this.props
    updateBook(book, row)
  }
  
  
  render() {
    const { allBooks } = this.props;
    if (allBooks.size === 0) {
      return (
        <div className="center-text">
          <RingLoader color="#26a65b" size="96px" margin="4px" />;
        </div>
      );
    }
    
    const currentlyReading = allBooks.filter(book => book.get('shelf') === 'currentlyReading');
    const wantToReadBooks = allBooks.filter(book => book.get('shelf') === 'wantToRead');
    const readBooks = allBooks.filter(book => book.get('shelf') === 'read');
    
    
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReading.size > 0 &&
                  currentlyReading.map(book => (
                      <SingleBook
                        key={book.get('id')}
                        book={book}
                        addBookTo={row => this.updateBook(book, row )}
                        defaultSelected="currentlyReading"
                      />
                    ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToReadBooks.size > 0 &&
                    wantToReadBooks.map(book => (
                      <SingleBook
                        key={book.get('id')}
                        book={book}
                        addBookTo={row => this.updateBook(book, row )}
                        defaultSelected="wantToRead"
                      />
                    ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {readBooks.size > 0 &&
                    readBooks.map(book => (
                      <SingleBook
                        key={book.get('id')}
                        book={book}
                        addBookTo={row => this.updateBook(book, row )}
                        defaultSelected="read"
                      />
                    ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ books }) {
  return {
    allBooks: books.get('allBooks'),
    booksPosition: books.get('booksPosition'),
    allBooksId: books.get('allBooksId'),
  };
}

export default connect(mapStateToProps, { addBookTo, fetchAllBooks, updateBook })(MyReads);
