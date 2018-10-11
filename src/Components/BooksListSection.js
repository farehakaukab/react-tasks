import React from 'react'
import Waypoint from 'react-waypoint';
import {Link} from "react-router-dom";
import "./../css/styles.css";

var books_info;

const BooksListSection = ({booksList, onNavigationLoad}) => {
  
if(booksList=="no record found."){
    books_info =  <li key={"no_record"}>No record found</li>
    }

    else if(booksList.length!=0){
    books_info= booksList.map((book) => 
    <li key={book.best_book[0].id[0]._}>
        <Link to={'/BookDetails/:' + book.best_book[0].id[0]._}>
        {book.best_book[0].title[0] + ' - ' + book.best_book[0].author[0].name[0]}
        </Link>
    </li>
    );
    }
  
  return <ul className="allBooks">{books_info}
            <Waypoint onEnter={onNavigationLoad}/> 
        </ul>;
}
export default BooksListSection;