import React,{ Component } from "react";
import {connect} from "react-redux";
import {getBooks,resetStates} from "../Actions/Actions"
import Suggestions from "./Suggestions";
import SearchForm from "./SearchForm";
import {bindActionCreators} from "redux";
//import { debounce } from "debounce";

const listType= 'Suggestion List';

class Main extends Component {

    constructor(props){
        super(props);
        this.getBooks = this.getBooks.bind(this);
        this.onNavigateSearch= this.onNavigateSearch.bind(this);
        this.hideSuggestions=this.hideSuggestions.bind(this);
        this.state={
            inputValue:'',
            suggestionBoxOpen:false,
        };
    
    }

    componentDidMount(){
        this.props.resetStates();
        document.addEventListener('mousedown', this.hideSuggestions, false);
      }

    componentWillUnMount(){
        document.removeEventListener('mousedown', this.handleClickList, false);
    }

    hideSuggestions(event){
        if(event.target.nodeName!='UL'&& event.target.nodeName!='INPUT' && event.target.nodeName!='LI' && event.target.nodeName!='A'){
            this.setState({suggestionBoxOpen:false});
        }
    }

    getBooks(event){
        this.props.getBooks(event.target.value, listType);  
        this.setState(
            {inputValue: event.target.value,
                suggestionBoxOpen:true});
    }

    onNavigateSearch(){
        this.props.history.push('/BooksList/:'+this.state.inputValue);
      }

    render(){
        return (
            <div>
              <h1>Search A Book Name</h1>
              <SearchForm onNavigateSearch={this.onNavigateSearch} getBooks={this.getBooks} inputValue={this.state.inputValue}></SearchForm>
              {(this.state.suggestionBoxOpen) ? <Suggestions results={this.props.suggestedBooks} input={this.state.inputValue} totalResults={this.props.totalResults}/> : null} 
            </div>
         );
    }
}

const mapStateToProps = state => ({
        suggestedBooks: state.Reducer.suggestedBooks,
        totalResults: state.Reducer.totalResults,
});

  
const mapDispatchToProps = dispatch => ({
    getBooks: bindActionCreators(getBooks, dispatch),
    resetStates: bindActionCreators(resetStates, dispatch),
});
  
Main = connect(mapStateToProps, mapDispatchToProps)(Main);
  
export default Main;