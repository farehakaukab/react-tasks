import {combineReducers} from "redux";
import {
    Spinner, // The React component
    pendingTasksReducer, // The redux reducer
    pendingTask, // The action key for modifying loading state
    begin, // The action value if a "long" running task begun
    end, // The action value if a "long" running task ended
    endAll // The action value if all running tasks must end
  } from 'react-redux-spinner';

const initialStates= {suggestedBooks:[],bookDetails:[],totalResults:0};

const Reducer=(state=initialStates, action) => {
    switch(action.type){
        case "SHOW_BOOKS": {
            return (action.bookslistType=='Books List')?
            {...state, suggestedBooks: state.suggestedBooks.concat(action.books),totalResults:action.count} 
            : {...state, suggestedBooks: action.books,totalResults:action.count};
        }
        case "SHOW_BOOK_DETAILS":{
            return {...state,bookDetails:action.book};
        }
        case "CLEAR_BOOKDETAIL_DATA":{
            return {...state,suggestedBooks:[],bookDetails:[],totalResults:0};
        }
        default:{
            return state;
        }
    }
}

const red= combineReducers({Reducer,pendingTasksReducer});
export default red;