import React, {Component} from 'react';
import Book from './Book';

/**
 * Classe que representa um conjunto
 * de livros.
 * @extends Component
 */
class BookList extends Component{

  /**
   * Método que renderiza e define a estrutura visual
   * de uma lista de livros.
   */
  render(){
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              /**
               * Mapeia os livros recebidos
               * pelo props para elementos de
               * lista que encapsulam um componente
               * livro. O componente livro recebe
               * uma função de atualizaçõa e o seu
               * livro correspondente.
               */
            }
            {
              this.props.books.map(book => (
                <li key={'book-'+book.id}>
                  <Book update={this.props.update} book={book}/>
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