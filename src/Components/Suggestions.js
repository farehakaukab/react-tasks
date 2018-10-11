import React from 'react'
import {Link} from "react-router-dom";
import "./../css/styles.css";

let options=[];

const Suggestions = (props) => {
  
  if(props.results.length!=0){
    
    if(props.results!="no record found."){
      
      let counter=0;
      options = props.results.map(book => {
        
        if(counter<5){
          counter+=1;
          //
          return(
            <li key={book.best_book[0].id[0]._}>
              <Link to={'/BookDetails/:' + book.best_book[0].id[0]._}>
                {book.best_book[0].title[0] + ' - ' + book.best_book[0].author[0].name[0]}
              </Link>
            </li>
            )
        }
      });

      options.push(
        <li key="showMore">{(props.totalResults>5)? <Link to={'/BooksList/:' + props.input}>{props.totalResults-5} More </Link> : 
        '0 More Results'} 
        </li>);  
    }

    else
      options=<p>No record found</p>
  }
  
  return <ul className="suggestionBox">{options}</ul>
}

export default Suggestions;