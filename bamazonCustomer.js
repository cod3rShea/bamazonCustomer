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
        connection.end();
      });

}
