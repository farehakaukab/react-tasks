 
export function getDetailsofSpecificBook(id){
  let bookInfo;
  return function(dispatch){
      fetch('https://www.goodreads.com/book/show.xml?key=nUVxa8PpzM2ozg7ifhJnmg&id='+id.substring(1))
      .then(res=> res.text())
      .then(xml => {
          var parseString = require('xml2js').parseString;
          parseString(xml, function (err, result) {
              result.error!="Page not found"?bookInfo=result.GoodreadsResponse.book:bookInfo="no record found.";
              dispatch(
                  {
                      type: "SHOW_BOOK_DETAILS",
                      book: bookInfo,
                  }
              );
          });
      
      });
  }
}

export function getBooks(input, listType){
  return function (dispatch){
      fetch('https://www.goodreads.com/search.xml?key=nUVxa8PpzM2ozg7ifhJnmg&q='+input)
      .then(res=> res.text())
      .then(xml => {
              var parseString = require('xml2js').parseString;
              parseString(xml, function (err, result) {
                  let resp = result.GoodreadsResponse.search[0].results[0].work;
                  if(resp==undefined){
                      resp="no record found."
                  }
                  dispatch(
                      {
                          type: "SHOW_BOOKS",
                          books: resp,
                          count: result.GoodreadsResponse.search[0]['total-results'][0],
                          bookslistType: listType
                      }
                  );
              });
      
      });
  } 
}


export function resetStates(){
    return(
        {
            type: "CLEAR_BOOKDETAIL_DATA"
        }
    );
}