import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'


class SearchPage extends Component {

    static propType = {
        storedBooks : PropTypes.array.isRequired,
        UpdateShelf : PropTypes.func.isRequired
    }

    state={
        query :'',
        searchBooks : []
    }

    /* 
	   Update query with latest user input. 
	   Also, conduct the BooksAPI search passed down 
	   from the parent app and show searched books
    */

    updateQuery = (query) =>{

        const  storedBooks  = this.props.storedBooks
        this.setState({ query : query })

        BooksAPI.search(query).then(searchResults =>{
            if(searchResults && searchResults.length > 0){
                for(let i=0 ; i<searchResults.length ; i++ ){
                    for(let j=0 ; j < storedBooks.length ; j++){
                        if(searchResults[i].id === storedBooks[j].id){
                            const shelfindx = storedBooks.findIndex(book => book.id === searchResults[i].id)
                            searchResults[i].shelf = storedBooks[shelfindx].shelf
                        }else{
                            searchResults[i].shelf = "none"
                        }
                    }
                }
            }

            this.setState({ searchBooks : searchResults })
        })


        
    }

    render() {
        const UpdateShelf = this.props.UpdateShelf
        console.log(UpdateShelf)
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input 
                            type="text" 
                            value={this.state.query} 
                            placeholder="Search by title or author" 
                            onChange={(event) => this.updateQuery(event.target.value)}/>

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">

                     {this.state.searchBooks && this.state.searchBooks.length > 0 && 
                        this.state.searchBooks.map(book => 
                                    <Book key={book.id}
                                          bookItem = {book}
                                          UpdateShelf = {UpdateShelf}
                                    /> 
                            )}

                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchPage
