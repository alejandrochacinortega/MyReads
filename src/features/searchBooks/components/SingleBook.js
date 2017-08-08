import React from 'react';

const SingleBook = ({ book }) => {
  const { thumbnail } = book.imageLinks ? book.imageLinks : 'http://books.google.com/books/content?id=blCyf8XF41sC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api';
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${thumbnail})`,
            }}
          />
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">
                Currently Reading
              </option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    </li>
  )
};

export default SingleBook;