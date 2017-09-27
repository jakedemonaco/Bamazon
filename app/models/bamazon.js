// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");
 
 sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Creates a "Products" model that matches up with DB
var Products = sequelize.define("products", {
  item_id: {
    type: Sequelize.INTEGER
  },
  product_name: {
    type: Sequelize.STRING
  },
  department_name: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
  stock_quantity: Sequelize.INTEGER
});


// Deletes table before it could be queried by bamazonCuster.js the .then function will happen no matter what, can start fresh database with this code syncs with DB

// sequelize.sync({force: true})
//   .then(()=>{
//   var products = [
//   ["Uncharted 4", "Video Games", 49.95, 150],
//   ["DOOM", "Video Games", 59.99, 200],
//   ["Crate of Spam", "Food and Drink", 24.50, 50],
//   ["Cool Shades", "Apparel", 75.00, 5],
//   ["Worn Denim Jeans", "Apparel", 54.25, 35],
//   ["Survival Towel", "Necessities", 42.42, 42],
//   ["Bill and Ted's Excellent Adventure", "Films", 15.00, 25],
//   ["Mad Max: Fury Road", "Films", 25.50, 57],
//   ["Monopoly", "Board Games", 30.50, 35],
//   ["Yahtzee", "Board Games", 19.95, 23]
//   ]
//   products.map(function(arg, index){
//     return Products.create({
//       item_id: index+1,
//       product_name: arg[0],
//       department_name: arg[1],
//       price: arg[2],
//       stock_quantity: arg[3]
//     })
//   })
// });

// Makes the Products Model available for other files (will also create a table)
module.exports = Products;