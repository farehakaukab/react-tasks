import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import * as Actions from "../Actions/Actions";
import BooksStore from "../Store/BooksStore";
import Suggestions from './Suggestions';
import "./../css/styles.css";

class Main extends Component {
  constructor(props){
    super(props);
    this.getBooks = this.getBooks.bind(this);
    this.onNavigateSearch= this.onNavigateSearch.bind(this);
    this.hideSuggestions=this.hideSuggestions.bind(this);
    this.state={
      inputValue:'',
      totalResults:0,
      suggestionBoxOpen:true,
    };

  }

  componentWillMount(){
    BooksStore.on("change", ()=>{
      this.setState(
        {
          totalResults:BooksStore.showResultCount(),
        });
    });
  }

  componentDidMount(){
    document.addEventListener('mousedown', this.hideSuggestions, false);
  }

  componentWillUnMount(){
    document.removeEventListener('mousedown', this.handleClickList, false);
  }

  hideSuggestions(event){
    if(event.target.nodeName!='UL'&& event.target.nodeName!='INPUT' && event.target.nodeName!='LI' && event.target.nodeName!='A'){
      this.setState({
        suggestionBoxOpen:false
      });
    }
  }

  getBooks(event){
  
    Actions.getBooks(event.target.value);  
    this.setState({
      suggestionBoxOpen:true,
      inputValue: event.target.value,
    });
  }


  onNavigateSearch(){
    this.props.history.push('/BooksList/:'+this.state.inputValue);
  }

    render() {
      
      return (
          <div>
            <h1>Search A Book Name</h1>
            <input value={this.state.inputValue} onChange={this.getBooks}  placeholder="Search for..."/>
            <button onClick={this.onNavigateSearch}>Search</button>
            {(this.state.suggestionBoxOpen) ? <Suggestions results={BooksStore.showSuggestedBooks()} input={this.state.inputValue} totalResults={this.state.totalResults}/> : null} 
          </div>
      );
    }
  }
   
  export default withRouter(Main);