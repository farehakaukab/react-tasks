import React, { Component } from "react";
import {getBooks} from "../Actions/Actions";
import {Link} from "react-router-dom";
import Waypoint from 'react-waypoint';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import "./../css/styles.css";

class BooksList extends Component {

  constructor(props){
    super(props);
    this.completeList=[];
    this.onNavigationHome= this.onNavigationHome.bind(this);
    this.onNavigationLoad= this.onNavigationLoad.bind(this);
    this.state={
      pageCount:0
    };
  }

  componentWillMount(){
    this.getAllBooks();
  }
  
  getAllBooks(){
    if(this.props.match.params.input!=""){
      this.props.getBooks(this.props.match.params.input);
    }
  }

  onNavigationHome(){
    this.props.history.push('/');
  }

  onNavigationLoad(){
    this.setState({pageCount: this.state.pageCount+1});
    if (this.state.pageCount< (this.props.totalResults/20)) 
      this.props.getBooks(this.props.match.params.input + '&page=' + this.pageCount);
  }
  render() {
    let books_info;
    if(this.props.suggestedBooks=="no record found." || this.props.suggestedBooks.length==0){
        this.completeList =  <li key={"no_record"}>No record found</li>
    }
    else if (this.props.suggestedBooks.length!=0 && typeof(this.props.suggestedBooks)!='string'){
      books_info= this.props.suggestedBooks.map((book) => 
      <li key={book.best_book[0].title[0]}>
        <Link to={'/BookDetails/:' + book.best_book[0].id[0]._}>
                {book.best_book[0].title[0] + ' - ' + book.best_book[0].author[0].name[0]}
              </Link>
      </li>
      );
      this.completeList.key!="no_record" && this.completeList.type!='p'? this.completeList=[...this.completeList,...books_info] : this.completeList=books_info;
    }
    else{
      this.completeList=<p>Fetching Data</p>
    }


    return (
      <div>
        <button onClick={this.onNavigationHome}>Home</button>
        <h1>Searched Name: {this.props.match.params.input.substring(1)} </h1>
        <h2>Total Results: {this.props.totalResults} </h2>
        <ul>{this.completeList}</ul>
        
        <Waypoint
          onEnter={this.onNavigationLoad}
        />
        
      </div>
    );
  }
}

const mapStateToProps = store => ({
  suggestedBooks: store.suggestedBooks,
  totalResults: store.totalResults
});

const mapDispatchToProps = dispatch => ({
  getBooks: bindActionCreators(getBooks, dispatch),
});

BooksList = connect(mapStateToProps, mapDispatchToProps)(BooksList);

export default BooksList;