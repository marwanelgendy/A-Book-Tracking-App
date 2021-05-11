import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './components/SearchPage'
import TrackPage from './components/TrackPage'

class BooksApp extends React.Component {
  state = {
    /* 
      Collection of all books currently in the home app. Since this is the 
      parent component of the app, this should hold the book data and pass 
      it down to child components when required
    */
    books : []
  }

   /* 
    Asynchronously retrieve book data for the first time AFTER
    the app component initially mounts. Once retrieved, set the new state
  */
  componentDidMount(){
      BooksAPI.getAll().then(books =>{
        this.setState({ books : books})
      })
  }

  updateShelf = (book,shelf)=>{
    const bookindx = this.state.books.findIndex(item => item.id === book.id)
    const updatedList = this.state.books

    if(bookindx === -1){
      book.shelf = shelf
      updatedList.push(book)
    }
    else{
      updatedList[bookindx].shelf = shelf
    }

    this.setState({ books : updatedList })

    BooksAPI.update(book,shelf)
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={()=>(
            <TrackPage
              books ={this.state.books}
              UpdateShelf = {this.updateShelf}
            />
        )}/>
        
        <Route path='/search' render={()=>(
            <SearchPage
              storedBooks = {this.state.books}
              UpdateShelf = {this.updateShelf}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp
