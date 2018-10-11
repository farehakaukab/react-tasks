import React, { Component } from "react";
import {getDetailsofSpecificBook} from "../Actions/Actions";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import "./../css/styles.css";

class BookDetails extends Component {
  constructor(props){
    super(props);
    this.onNavigationHome= this.onNavigationHome.bind(this);
    this.getBook=this.getBook.bind(this);
  }

  componentWillMount(){
    this.getBook(this.props.match.params.id);
  }

  getBook(bookId){
    this.props.getDetailsofSpecificBook(bookId);
  }

  onNavigationHome(){
    this.props.history.push('/');
  }

  render() {
  
    if(this.props.bookDetails=="no record found." || this.props.bookDetails.length==0){
      return (
        <div>
          <button onClick={this.onNavigationHome}>Home</button>
          <h1>Book Details</h1>
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
         </div>
      );
      
     
    }

    else if(this.props.bookDetails.length!=0 && this.props.bookDetails[0].text_reviews_count[0]!=undefined){
      const text_reviews_count = this.props.bookDetails[0].text_reviews_count[0];
      const average_rating = this.props.bookDetails[0].average_rating[0];
      const title= this.props.bookDetails[0].title[0];
      const author= this.props.bookDetails[0].authors[0].author.map((author)=>(author.name[0])).join(', ');
      const small_image_url= this.props.bookDetails[0].image_url[0];
      const ratings_count= this.props.bookDetails[0].ratings_count[0];
      
      return (
        <div>
          <button onClick={this.onNavigationHome}>Home</button>
          <h1>Book Details</h1>
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
          
        </div>
      );
    }

    else{
      return <p>Searching</p>
    }
  }  
}

const mapStateToProps = store => ({
  bookDetails: store.bookDetails,
});

const mapDispatchToProps = dispatch => ({
  getDetailsofSpecificBook: bindActionCreators(getDetailsofSpecificBook, dispatch),
});

BookDetails = connect(mapStateToProps, mapDispatchToProps)(BookDetails);

export default withRouter(BookDetails);