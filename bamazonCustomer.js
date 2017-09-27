// Initializes the npm packages used
var mysql2 = require("mysql2");
var inquirer = require("inquirer");
require("console.table");
var Products = require("./app/models/bamazon.js");

// Initializes the connection variable to sync with a MySQL database
var sequelize = require("./app/config/connection.js")

// Creates the connection with the server and loads the product data upon a successful connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

function WhatDoYouWantToBuy() {
    inquirer.prompt([{
        name: "question",
        type: "list",
        message: "Welcome to Bamazon! Would you like to browse our inventory?",
        choices: ["Absolutely! Show me what you have.", "No, I'm just a window shopping."]
    }, ]).then(function(answers) {
        // Use user feedback for... whatever!!
        console.log(answers.question)

        switch (answers.question) {
            case "Absolutely! Show me what you have.":
                LookAtAllProducts();
                break;
            case "No, I'm just a window shopping.":
                YellAtFreeloader();
        }

    });
}

function LookAtAllProducts() {
    Products.findAll().then(products => {
        // console.log(products)
        products.forEach((product) => {
            console.log(product.product_name);
        })
    });
}

function YellAtFreeloader() {
  console.log("Then get the heck out of here or I'm calling the cops your filthy freeloader!")
}


function BuySomeStuff() {
    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "Ok what do you want",

    }, ]).then(function(answers) {
        // Use user feedback for... whatever!!
        console.log(answers.name)

        Products.findAll({
            where: {
                product_name: answers.name
            }
        }).then((result) => {
            console.log(result[0].product_name)
            console.log(result[0].stock_quantity)
            var productStock = parseInt(result[0].stock_quantity)
            TakingOutOfDatabase(productStock);
        });
    });
}

function TakingOutOfDatabase(stock) {
  inquirer.prompt([{
        name: "quantity",
        type: "input",
        message: "How many do you want?",

    }, ]).then(function(answers) {
      stock = parseInt(stock);
        // Use user feedback for... whatever!!
        console.log(answers.quantity)
        var quantityDesired = parseInt(answers.quantity);
        console.log(quantityDesired)
        if(quantityDesired > stock) {
          console.log('We dont carry that quantity here boyo')
        } else {

          console.log(stock - quantityDesired)
        }

        

    });
}



WhatDoYouWantToBuy();


// What do you want
// How many
// This is the total, can you afford to pay
// cash or credit
// would you like a receipt

// USER CASES
// YOU HAVE TO SOLVE PROBLEMS.
// YOU NEED AN ACTOR AND A NEED
// I AM A CUSTOMER AND I NEED TO LOOK AT ALL THE PRODUCTS
// I AM A CUSTOMER AND I NEED TO BUY A PRODUCT
// I AM A MANAGER AND I NEED TO KEEP TRACK OF THE INVENTORY OF PRODUCTS
// I AM A CUSTOMER AND I NEED TO KNOW WHEN THERE IS NO LONGER ANY PRODUCTS IN STOCK 


// Products.findAll({
//   where: {
//     id: 3
//   }
// }).then((result) => {
//   console.log(result)
// });