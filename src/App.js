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
   * Estado do componente. Contém uma lista
   * dos livros que tem estante e uma lista
   * específica para busca.
   */
  state = {
    books: [],
    booksSearch: []
  }

  /**
   * Busca todos os livros da API.
   */
  getAllBooks = () => {
    // Busca por todos os livros que tem estante na API
    BooksAPI.getAll().then(books => {
      // Atualiza o estado
      this.setState({books:books})
    })
  }

  /**
   * Busca os livros da API que possuem autor
   * ou titulo que contém ou correspondem a
   * string de consulta.
   * @param {string} query - String de consulta.
   */
  searchBooks = (query) => {
    // Busca na API livros que correspondem a query.
    BooksAPI.search(query).then(booksFromAPI => {
      console.log(booksFromAPI)
      // Verifica se houve erro na consulta
      if(booksFromAPI.error){
        // Se houver, esvazia a lista de livros
        this.setState({booksSearch:[]})
      }else{
        // A API no método de busca não devolve a estante
        // do livro. Por isso é preciso verificar e atualizar
        // o valor de shelf caso um livro pertença a uma estante.
        const booksState = this.state.books;
        let bookInstance;
        for(let i = 0; i < booksFromAPI.length; i++){
          // Encontra um instância de livro que possua um id correspondente.
          bookInstance = booksState.filter(book => booksFromAPI[i].id === book.id)[0]
          // Verifica se não é undefined e atualiza o valor do shelf.
          if(bookInstance)
            booksFromAPI[i].shelf = bookInstance.shelf
        }
        // Atualiza o estado do componente.
        this.setState({booksSearch:booksFromAPI})
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
      let booksSearch = this.state.booksSearch.slice(0);
      // Há duas situações: o livro foi atualizado na página
      // de busca ou na de estantes
      // Se o livro não foi encontrado na lista de livros de
      // estante, quer dizer que foi atualizado na página de
      // busca. Caso contrário na de estantes.
      if(index === -1){
        // O livro é adicionado aos livros de estante caso o
        // valor não seja None
        if(shelf !== 'None')
          books.push(book);
        // Atualiza o valor do shelf
        const index2 = booksSearch.indexOf(book);
        booksSearch[index2].shelf = shelf;
        // Atualiza os estados das listas de livros.
        this.setState({books:books, booksSearch:booksSearch});
      }else{
        // Atualiza o valor da prateleira do livro.
        books[index].shelf = shelf;
        this.setState({books:books});
      }
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
          <SearchBooks init={this.getAllBooks} books={this.state.booksSearch} update={this.updateBookShelf} search={this.searchBooks}/>
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
