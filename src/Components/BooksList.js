import React, { Component } from "react";
import {getBooks} from "../Actions/Actions";
import BooksListSection from "./BooksListSection";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import HomeButton from "./HomeButton";
import "./../css/styles.css";

const listType='Books List';
class BooksList extends Component {

  constructor(props){
    super(props);
    this.onNavigationHome= this.onNavigationHome.bind(this);
    this.onNavigationLoad= this.onNavigationLoad.bind(this);
    this.state={
      pageCount:0
    };
  }

  componentWillMount(){
    this.props.getBooks(this.props.match.params.input, listType);
  }

  // componentWillUnmount(){
  //   books_info=[];
  // }

  onNavigationHome(){
    this.props.history.push('/');
  }

  onNavigationLoad(){
    this.setState({pageCount: this.state.pageCount+1});
    if (this.state.pageCount< (this.props.totalResults/20)) 
      this.props.getBooks(this.props.match.params.input + '&page=' + this.state.pageCount, listType);
  }
  render() {
    return (
      <div>
        <HomeButton onNavigationHome={this.onNavigationHome}></HomeButton>
        <h1>Searched Name: {this.props.match.params.input.substring(1)} </h1>
        <h2>Total Results: {this.props.totalResults} </h2>
        <BooksListSection booksList={this.props.suggestedBooks} onNavigationLoad={this.onNavigationLoad}></BooksListSection>
        
      </div>
    );
  }
}

const mapStateToProps = store => ({
  suggestedBooks: store.Reducer.suggestedBooks,
  totalResults: store.Reducer.totalResults
});

const mapDispatchToProps = dispatch => ({
  getBooks: bindActionCreators(getBooks, dispatch),
});

BooksList = connect(mapStateToProps, mapDispatchToProps)(BooksList);

export default BooksList;