// Import the Express.js framework by requiring the 'express' module

const express = require('express');
// Import the Mongoose library
const mongoose = require('mongoose');
// Define the port number for the web server to listen on
const port =  3000; 
// It is used to establish a connection to a database.
const connectdb=require('./config/connect')
//it is used to import the 'User' model, which likely represents user-related data and functionality.
const User=require('./modele/user')
// Load environment variables from the .env file located in the ./config directory

require('dotenv').config({path:'./config/.env'})
// Create an instance of the Express.js application

const app = express();


// Define an array of people with their attributes
const create = async () => {
  try {
      const arrayOfPeople = [
          { name: "John", age: 50, favoriteFoods: ["burritos"] },
          { name: "Mary", age: 12, favoriteFoods: ["burritos", "pizza"] },
          { name: "Jane", age: 15, favoriteFoods: [] } // Changed "Mary" to "Jane"
      ];

      // Use User.insertMany() to insert the array of objects
      const users = await User.insertMany(arrayOfPeople);

      console.log("Users created successfully:", users);
  } catch (error) {
      console.error("Error creating users:", error);
  }
};



// Middleware to parse JSON data
app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send({msg:users});
  } catch (error) {
   console.log(error);
  }
});
app.post('/users', async (req, res) => {

 try {
    const newUser = new User(req.body);
    await newUser.save();
    res.send(newUser);
  } catch (error) {
console.log(error);
  }
});
app.put('/users/:id', async (req, res) => {
 try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {name:req.body.name} );
    res.send(updatedUser);
  } 
  catch (error) {
 console.log(error);
  }
});
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    result=await User.findByIdAndRemove(id);
    res.send({ message: result });
  } catch (error) {
 
    console.log(error);
  }
});

connectdb()
app.listen(port,(err)=>{err?console.log(err):console.log("server running");})
