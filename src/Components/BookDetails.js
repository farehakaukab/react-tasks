import React, { Component } from "react";
import * as Actions from "../Actions/Actions";
import BooksStore from "../Store/BooksStore";
import {withRouter} from "react-router-dom";

class BookDetails extends Component {
  constructor(props){
    super(props);
    this.onNavigationHome= this.onNavigationHome.bind(this);
    this.state={
      bookDetails:'no book',
    };
    
  }

  componentWillMount(){
    let param= decodeURIComponent(this.props.match.params.bookname);
    this.getBook(param);
    BooksStore.on("change", ()=>{
      this.setState(
        {
          bookDetails: BooksStore.showBookDetails(),
        });
    });
    
  }

  componentDidMount(){
   
  }

  getBook(bookname){
    Actions.getDetailsofSpecificBook(bookname);
  }

  onNavigationHome(){
    BooksStore.resetAll();
    this.props.history.push('/');
  }

  render() {
  
    if(this.state.bookDetails=="no record found." || this.state.bookDetails.length==0){
      return (
        <div>
          <table>
            <thead>
              <tr>
                  <th>Cover</th>
                  <th>Book Title</th>
                  <th>Author</th>
                  <th>Cumulative Rating</th>
                  <th>Rating/Reviews</th>
              </tr>
            </thead>
              
            <tbody>
              <tr>
                <td colSpan="5">No record found!</td>
              </tr>
            </tbody>
          </table>
          <button onClick={this.onNavigationHome}>Home</button>
        </div>
      );
      
     
    }

    else if(this.state.bookDetails.length!=0 && this.state.bookDetails.text_reviews_count!=undefined){
      const text_reviews_count = this.state.bookDetails.text_reviews_count[0]._;
      const average_rating = this.state.bookDetails.average_rating[0];
      const title= this.state.bookDetails.best_book[0].title[0];
      const author= this.state.bookDetails.best_book[0].author[0].name[0];
      const small_image_url= this.state.bookDetails.best_book[0].small_image_url[0];
      const ratings_count= this.state.bookDetails.ratings_count[0]._;
      return (
        <div>
          <table>
            <thead>
              <tr>
                  <th>Cover</th>
                  <th>Book Title</th>
                  <th>Author</th>
                  <th>Cumulative Rating</th>
                  <th>Rating/Reviews</th>
              </tr>
            </thead>
              
            <tbody>
              <tr>
                <td><img src={small_image_url} /></td>
                <td>{title}</td>
                <td>{author}</td>
                <td>{average_rating}</td>
                <td>{ratings_count} / {text_reviews_count}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={this.onNavigationHome}>Home</button>
        </div>
      );
    }

    else{
      return <p>Searching</p>
    }
  }  
}

export default withRouter(BookDetails);