//require node modules
const inquirer = require('inquirer');
const mysql = require('mysql');
//connection to mysql info
const connection = mysql.createConnection({
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'Bamazon'
});
//connection to database
connection.connect(function(err) {
  if(err) throw err;
  console.log(`connected as id ${ connection.threadId }`);
  displayItems();
})
//function to display the items for sale
function displayItems() {
  connection.query("SELECT * FROM products", function(err, res){
    if(err) throw err;
//loop to go through the database to print out products
    for(var i = 0; i < res.length; i++){
      console.log(
        'Item No. ' + res[i].item_ID + ' || ',
        'Product: ' + res[i].product_name + ' || ',
        'Price: ' + res[i].price + ' || '
      );
    }
    beginBuy();
  });//connection finish
}//displayItems end

function beginBuy() {
  connection.query('SELECT * FROM products', function(err, res){
    if(err) throw err;

    inquirer
     .prompt([
       {
         name: 'itemNo',
         type: 'rawlist',
         choices: function() {
           let noItem = [];
           for(var i = 0; i < res.length; i++) {
             noItem.push(res[i].product_name)
           }
            return noItem;
         },
         message: 'What would you like to buy?'
       },
       {
         name: 'itemQuantity',
         type: 'input',
         message: 'How many do you want to buy?'
       }
     ])//prompt finished
     .then(function(answer){
       var selectedItem;
       for(var i = 0; i < res.length; i++) {
         if(res[i].product_name === answer.noItem) {
           selectedItem = res[i];
           console.log(res[i].product_name);
         }
       }
       let answerNum = parseInt(answer.itemQuantity)
       let stockNum = parseInt(selectedItem.stock_quantity)
       console.log(stockNum);
       if (answerNum > stockNum){
         console.log('Insufficient Stock Remaining!')
         displayItems();
       } else if (answerNum <= stockNum){
          let updateStock = stockNum - answerNum;
          upDatabase(selectedItem, updateStock);
          console.log("You have purchased " + selectedItem);
          }
        });//then statement
})
}
     function upDatabase(productName, numStock) {
       connection.query('UPDATE products SET ? WHERE ?',
       [
         {
           product_name: productName
         },
         {
           stock_quantity: numStock
         }, function(err, res) {
           console.log(res.affectedRows + 'Need to make payment first')
         }
       ]
     );
   };
