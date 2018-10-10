import dispatcher from "../dispatcher";

export function addBook(title, author,rating){
  dispatcher.dispatch(
    {
      type: "ADD_BOOK",
      book:{title,author,rating},
    }
  );
}

export function getDetailsofSpecificBook(bookname){
  let respToSend=[];
  let respLength=0;

  fetch('https://www.goodreads.com/search.xml?key=nUVxa8PpzM2ozg7ifhJnmg&q='+bookname.substring(1))
    .then(res=> res.text())
    .then(xml => {
      var parseString = require('xml2js').parseString;
      parseString(xml, function (err, result) {
          const respRecieved=result.GoodreadsResponse.search[0].results[0].work;
          if(respRecieved!=undefined){
            respLength = respRecieved.length;
          }
          
          if(respLength==0){
            respToSend="no record found."
          }
          else{
            for(let i=0; i<respLength;i++){
              if(respRecieved[i].best_book[0].title[0]==bookname.substring(1)){
                respToSend=respRecieved[i];
                break;
              }
            }
          }
          dispatcher.dispatch(
            {
              type: "SHOW_BOOK_DETAILS",
              book: respToSend,
            }
          );
      });
      
    });
}

export function getBooks(input){
  
  fetch('https://www.goodreads.com/search.xml?key=nUVxa8PpzM2ozg7ifhJnmg&q='+input)
    .then(res=> res.text())
    .then(xml => {
      var parseString = require('xml2js').parseString;
      parseString(xml, function (err, result) {
          let resp = result.GoodreadsResponse.search[0].results[0].work;
          getCountOfResult(result);
          if(resp==undefined){
            resp="no record found."
          }
          dispatcher.dispatch(
            {
              type: "SHOW_BOOKS",
              books: resp,
            }
          );
      });
      
    }); 
}

export function getCountOfResult(responce){
    const totalResults=responce.GoodreadsResponse.search[0]['total-results'][0];
    dispatcher.dispatch(
      {
        type: "SHOW_RESULT_COUNT",
        count:totalResults,
      }
    );  
}

