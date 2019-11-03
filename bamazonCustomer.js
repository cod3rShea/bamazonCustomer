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
	connection.query(query, function (err, res) {
		if (err) throw err;
		console.log(res);
		questionPrompt()
	});
}
function questionPrompt() {
	inquirer.prompt([
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
	]).then(function (inquirerResponse) {
		var myQuery = "SELECT item_id, product_name, stock_quantity, price FROM products WHERE ?"
		connection.query(myQuery, { item_id: inquirerResponse.productID }, function (err, results) {
			if (err) throw err;
			if (inquirerResponse.productUnits < results[0].stock_quantity) {
				var productsLeft = results[0].stock_quantity - inquirerResponse.productUnits;
				var costOfPurchase = inquirerResponse.productUnits * results[0].price;
				connection.query(`UPDATE products SET stock_quantity=${productsLeft} WHERE item_id=${inquirerResponse.productID}`, function (error, results) {
					if (err) throw err;
					console.log("Your total is: $" + costOfPurchase);
					availableItems();
				});
			} else {
				console.log("Insufficient quantity!");
			}
		})
	})
}
