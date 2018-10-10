import React, { Component } from "react";
import * as Actions from "../Actions/Actions";
import BooksStore from "../Store/BooksStore";
import {Link} from "react-router-dom";
import Waypoint from 'react-waypoint';


class BooksList extends Component {

  constructor(props){
    super(props);
    this.completeList=[];
    this.pageCount=0;
    this.onNavigationHome= this.onNavigationHome.bind(this);
    this.onNavigationLoad= this.onNavigationLoad.bind(this);
    this.state={
      booksList:'no books',
      resultCount:'',
    }
  }

  componentWillMount(){
    this.getAllBooks();

    BooksStore.on("change", ()=>{
      
      this.setState(
        {
          booksList: BooksStore.showSuggestedBooks(),
          resultCount: BooksStore.showResultCount(),
        });
      });
    
  }
  
  getAllBooks(){
    if(this.props.match.params.input!=""){
      Actions.getBooks(this.props.match.params.input);
    }
  }

  onNavigationHome(){
    BooksStore.resetAll();
    this.props.history.push('/');
  }

  onNavigationLoad(){
    this.pageCount+=1;
    if (this.pageCount< (this.state.resultCount/20)) 
      Actions.getBooks(this.props.match.params.input + '&page=' + this.pageCount);
  }
  render() {
    
    let books_info;
    if(this.state.booksList=="no record found." || this.state.booksList.length==0){
        this.completeList =  <li key={"no_record"}>No record found</li>
    }
    else if (this.state.booksList.length!=0 && typeof(this.state.booksList)!='string'){
      books_info= this.state.booksList.map((book) => 
      <li key={book.best_book[0].title[0]}><Link to={'/BookDetails/:' + encodeURIComponent(book.best_book[0].title[0])}>Book: {book.best_book[0].title[0]},  Author: {book.best_book[0].author[0].name[0]} </Link></li>
      );
      this.completeList.key!="no_record" && this.completeList.type!='p'? this.completeList=[...this.completeList,...books_info] : this.completeList=books_info;
    }
    else{
      this.completeList=<p>Fetching Data</p>
    }


    return (
      <div>
        <h2>Searched Name: {this.props.match.params.input.substring(1)} </h2>
        <span>Total Results: {this.state.resultCount} </span>
        <ul className="booksList">{this.completeList}</ul>
        
        <Waypoint
          onEnter={this.onNavigationLoad}
        />
        <button onClick={this.onNavigationHome}>Home</button>
      </div>
    );
  }
}

export default BooksList;