import React,{ Component } from "react";
import {connect} from "react-redux";
import {getBooks} from "../Actions/Actions"
import Suggestions from "./Suggestions";
import {bindActionCreators} from "redux";
import "./../css/styles.css";

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
        this.props.getBooks(event.target.value);  
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
              <input value={this.state.inputValue} onChange={this.getBooks}  placeholder="Search for..."/>
              <button onClick={this.onNavigateSearch}>Search</button>
              {(this.state.suggestionBoxOpen) ? <Suggestions results={this.props.suggestedBooks} input={this.state.inputValue} totalResults={this.props.totalResults}/> : null} 
            </div>
         );
    }
}

const mapStateToProps = state => ({
        suggestedBooks: state.suggestedBooks,
        totalResults: state.totalResults,
});

  
const mapDispatchToProps = dispatch => ({
    getBooks: bindActionCreators(getBooks, dispatch),
});
  
Main = connect(mapStateToProps, mapDispatchToProps)(Main);
  
export default Main;