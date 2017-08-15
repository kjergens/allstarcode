var shoppingCart = [];


/*
  Add one item to shopping list. This function is called whenever 
  the user clicks the Add to Cart link.
*/
addItem = (item) => {
  shoppingCart.push(item)
  $(".items").append(`<li>${item}</li>`)
}

/*
  Search for items. This function is called whenever the user
  enters a search term and hits the ENTER key.
*/
searchItem = () => {
    let productName=$("#search")[0].value; // get the new product to search

    $(".products").html("")  // clear old results

    // Get all products that match the search term
    $.getJSON(`https://price-api.datayuge.com/api/v1/compare/search?product=${productName}&api_key=TLHyGyOHvYVRxIeEgubFti0thQPGSMLHeeU`,
      function(productList) { 

        // Look up details for all the products that get returned
        for(row in productList) {

          for (r in row) {
            console.log("Processing "+productList[row][r].product_title) // debugging purposes

            // Get the product id (it is buried, need to do it like this.)
            let id=productList[row][r].product_id 

            $.getJSON(
              `https://price-api.datayuge.com/api/v1/compare/detail?id=${id}&api_key=TLHyGyOHvYVRxIeEgubFti0thQPGSMLHeeU`,
              function(data) {
                  console.log(data);
                  var info = data.data
                  let nem = info.product_name
                  let price = info.product_lowest_price;
                  let imag = info.product_images[0];
                  let lowest= info.product_lowest_price;
                  let plist= info.stores;
                  for (p of plist){
                    for (str in p) {
                      if (p[str].product_store) {

                        // Check if this has the lowest price
                        let lowPriceAlert = "";
                        if (lowest === p[str].product_price) {
                          lowPriceAlert = "LOWEST PRICE";

                         }


                        // Add product to page 
                        $('.products').append(
                            `<div class = "card">
                              <div class="card-image">
                                <img class = "prod_img" src="${imag}">
                              </div>
                              <div class="card-content">
                                <span class="card-title black-text">${nem}</span>
                                 <span class="rating" data-stars="5" data-default-rating="2.5"></span>
                                <p><i class="material-icons">attach_money</i>${p[str].product_price}</p> 
                                <p>${lowPriceAlert}</p>
                                <img src="${p[str].product_store_logo}">  
                                </div>
                                <div class="card-action">
                                <a onClick="addItem('${nem}')"><i class="material-icons">add_shopping_cart</i>Add to cart</a>
                              </div>        
                            </div>`
                          )
                        } // end if p[str].product_store
                      } // end str in p  
                    } // end p in plist
                } // end function(data)
              ) // end getJSON
          } // end for r of row
      } // end for row of rowData 
    }// end function(productList)
  ) // end getJSON
} // end searchItem()


/*
  This runs once, after the html has all loaded.
*/
$(document).ready( () => {
  $(".products").html("<h2>Search for anything.</h2>")

  /* Wire the search bar to the searchItem function. */
  $("#search-form").submit(function( event ) {
    event.preventDefault();
    searchItem();
  });

});


