const {ObjectId} = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res)=> {
  Todo.find().then((todos)=> {
    // Promise accepted
    res.send({todos});
    /* We could send simple arrays here like send(todos)
     * But this will simply deny us to add a new property.
     * Since array is a static method, we can't pass anything else there
     * It's always better to objectify those DSs
     * This feature is supported by JavaScript ES6
     */
  }, (e)=> {
    //Promise Rejected
    res.status(400).send(e);
  })
});

// GET /todos/
// Postman Series
app.get('/todos/:id', (req, res)=> {
  var id= req.params.id;
  // Validate id: isValid()
  if (!ObjectId.isValid(id)) {
    // console.log('ID not Valid');
    res.status(404).send();
  }
    // 404- send back empty string [not 400]
  // findById
  Todo.findById(id).then((todo)=> {
    // success
      // if no Todo- send back 404 with empty body
      if(!todo) {
        res.status(400).send({error: 'ID not Found'});
      }
      // if todo- send it back
      res.status(200).send({todo});
      },(e)=>{
        // error
          // 400 - send empty body back
        res.status(400).send({text: 'Gandiya Tod Denge MC'});
  });


  /* res.send(req.params);
   * This method will enable us to view the parameters we passed
   * req.params: URL parameters like values, ID etc.
   */
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
