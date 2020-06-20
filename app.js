const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express();
const Void = require('./scalar-void')

const ToDo = require('./Model/ToDo')

app.use(bodyParser.json())

app.use(
  '/graphql', // When we enter this route, we will get the GraphQL playground and we can test the GraphQL data.
  graphqlHTTP({
    //This is the same as Route in NodeJS.
    schema: buildSchema(` 
    
      type ToDo{
        _id: ID!
        title: String!
        description: String!
        status: String!
      }

      input ToDoInput{
        title: String!
        description: String!
        status: String!
      }

      input DeleteToDo{
          id: ID!
      }

    type RootQuery{
          todos: [ToDo!]!
        }
    type RootMutation{
          createToDo(name: ToDoInput): ToDo
          deleteToDo(id: DeleteToDo): ToDo
        }
    schema{
        query: RootQuery
        mutation: RootMutation
      }
    `),
    //This the same as the controllers for NodeJS.
    rootValue: {
      todos: async () => {
        const todo = await ToDo.find();
        if (todo) {
          return todo;
        }
      },
      createToDo: (args) => {
        const todo = new ToDo({
          title: args.name.title,
          description: args.name.description,
          status: args.name.status,
        });
        return todo
          .save()
          .then((todo) => {
            return { ...todo._doc };
          })
          .catch((err) => {
            console.log("Sorry! Couldn't save the ToDo");
          });
      },
        deleteToDo: async (args) => {
            const todo = await ToDo.findByIdAndRemove({ _id: args.id.id })
            if (todo) {
                console.log("Deleted Successfully");
            }
      }
    },
    graphiql: true,
  })
);

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