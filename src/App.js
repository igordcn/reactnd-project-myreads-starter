import React, {Component} from 'react'
import './App.css'
import SearchBooks from './SearchBooks';
import AllListsBooks from './AllListsBooks';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

/**
 * Classe que representa a aplicação
 */
class BooksApp extends Component {

  /**
   * Estado do componente. Contém todos
   * os livros presentes na aplicação.
   */
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  /**
   * Busca todos os livros da API.
   */
  getAllBooks = () => {
    // Busca por todos os livros na API
    BooksAPI.getAll().then(books => 
      // Atualiza o estado
      this.setState({books:books})
    )
  }

  /**
   * Busca os livros da API que possuem autor
   * ou titulo que contém ou correspondem a
   * string de consulta.
   * @param {string} query - String de consulta.
   */
  searchBooks = (query) => {
    // Busca na API livros que correspondem a query.
    BooksAPI.search(query).then(books => {
      // Verifica se houve erro na consulta
      if(books.error){
        // Se houver, esvazia a lista de livros
        this.setState({books:[]})
      }else{
        // Senão, atualiza o estado com os livros
        // correspondentes.
        this.setState({books:books})
      }
    })
  }

  /**
   * Atualiza a prateleira de um livro.
   * @param {Object} book - Livro a ser atualizado.
   * @param {string} shelf - Nova estante do livro.
   */
  updateBookShelf = (book, shelf) => {
    // Atualiza na api a prateleira do livro.
    BooksAPI.update(book, shelf).then(data =>{
      // Acha o índice do livro no estado atual.
      const index = this.state.books.indexOf(book);
      // Realiza uma cópia dos livros do estado atual.
      let books = this.state.books.slice(0);
      // Atualiza o valor da prateleira do livro.
      books[index].shelf = shelf;
      // Atualiza o estado do livro.
      this.setState({books:books});
    })
  }

  render() {
    return (
      <div className="app">
        {
          /**
           * Define a rota para o componente SearchBooks.
           * Passa como propriedades: os livros do estado
           * atual, uma função de atualização de estante
           * de livro updateBookShelf e a função de busca
           * de livro searchBook.
           */
        }
        <Route exact path="/search" render={() =>(
          <SearchBooks books={this.state.books} update={this.updateBookShelf} search={this.searchBooks}/>
        )}/>
        {
          /**
           * Define a rota para o componente AllListsBooks.
           * Passa como propriedades: os livros do estado
           * atual, uma função de atualização de estante
           * de livro updateBookShelf e a função para pegar
           * todos os livros.
           */
        }
        <Route exact path="/" render={() =>
          <AllListsBooks init={this.getAllBooks} books={this.state.books} update={this.updateBookShelf}/>
        }/>
      </div>
    )
  }
}

export default BooksApp
