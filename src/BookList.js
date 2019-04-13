import React, {Component} from 'react';
import Book from './Book';

class BookList extends Component{
    
    state = {
      
    }
    

    render(){
      return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {
                this.props.books.map(book => (
                  <li>
                    <Book title={book.title} author={book.author} url={book.url}/>
                  </li>
                ))
              }
            </ol>
          </div>
        </div>
      )
    }
}

export default BookList;