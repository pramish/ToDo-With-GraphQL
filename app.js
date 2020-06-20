const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// require('dotenv').config()
const app = express();

app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("I can see the server")
})








mongoose
  .connect(
    `mongodb+srv://${process.env.User}:${process.env.Password}@cluster0-ykim7.mongodb.net/${process.env.DBName}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running and Database is also connected');
    });
  });