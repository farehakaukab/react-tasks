import React, { Component } from "react";
import {Link} from "react-router-dom";

let options, suggestionBoxOpened;

class Suggestions extends Component  {
  constructor(props){
    super(props);
    
    this.hideSuggestionBox=this.hideSuggestionBox.bind(this);
    this.state={
      suggestionBoxOpened:true,
    }
    
  }

  hideSuggestionBox(){
    this.setState(
      {
      suggestionBoxOpened:false
      }
    );
  }

  render(){
    const results=this.props.results;

    if(results.length!=0){
      if(results!="no record found."){
        let counter=0;
        
        options = results.map(book => {
          if(counter<5){
            counter+=1;
            return(
            <li key={book.best_book[0].title[0]}>
              <Link to={'/BookDetails/:' + encodeURIComponent(book.best_book[0].title[0])}>
                {book.best_book[0].title[0] + ' - ' + book.best_book[0].author[0].name[0]}
              </Link>
            </li>)
          }
        }
        );
        options.push(
        <li key="showMore">{(this.props.totalResults>5)? <Link to={'/BooksList/:' + this.props.input}>{this.props.totalResults-5} More </Link> : 
        '0 More Results'} 
        </li>
        );
        
      }
      else
      options=<p>No record found</p>
    }
    else{  
        options=<p></p>
    }
    
    return (this.state.suggestionBoxOpened) ? <ul onBlur={this.hideSuggestionBox} >{options}</ul>:null
  }
  
}

export default Suggestions;