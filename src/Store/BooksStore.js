import {EventEmitter} from "events";
import dispatcher from "../dispatcher";

class BooksStore extends EventEmitter{
    constructor(){
        
        super();
        this.books=[]; 
        this.suggestedBooks=[];
        this.bookDetails=[];
        this.resultCount=[];
    }

    resetAll(){
        this.books=[]; 
        this.suggestedBooks=[];
        this.bookDetails=[];
        this.resultCount=[];
    }

    getAll(){
        return this.books;
    }

    addBook(title, author, rating){
        this.books.push(
            {title, author, rating}
        );
        this.emit("change");
    }

    getSuggestedBooks(data){
        this.suggestedBooks=data;
        this.emit("change");
   }


   showSuggestedBooks(){
        return this.suggestedBooks;
   }

   getBookDetails(bookdetails){
        this.bookDetails=bookdetails;
        this.emit("change");
   }

   showBookDetails(){
        return this.bookDetails;
   }

   getResultCount(count){
        this.resultCount=count;
        this.emit("change");
   }

   showResultCount(){
       return this.resultCount;
   }
    handleEvents(action){
        switch(action.type){
            case "ADD_BOOK":{    
                this.addBook(action.book.title,action.book.author, action.book.rating);
                break;
            }
            case "SHOW_BOOKS": {
                return this.getSuggestedBooks(action.books);
            }
            case "SAVE_BOOKS":{
                return this.saveBooksData(action.data);
            }
            case "SHOW_BOOK_DETAILS":{
                return this.getBookDetails(action.book);
            }
            case "SHOW_RESULT_COUNT":{
                return this.getResultCount(action.count);
            }
        }

    }
} 

const booksStore= new BooksStore();
dispatcher.register(booksStore.handleEvents.bind(booksStore));
export default booksStore;