// Require mysql and inguirer
var mysql = require("mysql");
var inquirer = require("inquirer");

// Create the connection obkject
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root1234",
    database: "bamazon_dev"
});

// Start Connection
connection.connect(function (err) {
    if (err) throw err;
    availableItems();
});

// Function to show all aviable items
function availableItems() {
// include the ids, names, and prices of products for sale.
    var query = "SELECT item_id, product_name, price, stock_quantity FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log(res);
        questionPrompt()
        connection.end();
      });

}

function questionPrompt(){
    inquirer
    .prompt([
      {
        type: "number",
        message: "What is the ID of the product you would like to buy?",
        name: "productID"
      },
      {
        type: "number",
        message: "How many units of the product would you like to buy?",
        name: "productUnits"
      },

    ])
    .then(function(inquirerResponse) {

    console.log("Your Prouduct ID" + inquirerResponse.productID);
    console.log("How Many you would like to purchase" + inquirerResponse.productUnits);
    //   if (inquirerResponse.postOrBid == "Post An Item") {
    //       console.log("Your " + inquirerResponse.postOrBid);
    //   } else {
    //       console.log("Your " + inquirerResponse.postOrBid);
    //   }    
       
    });
}
