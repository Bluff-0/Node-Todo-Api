// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
  if(err){
    return console.log(`Unable to connect to MongoDB server`);
  }
  console.log('Connected to MongoDB Server');
 const db= client.db('TodoApp');
 //  Delete Many
// db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result)=> {
//   console.log(result);
// });

 // Delete insertOne
// db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result)=> {
//   console.log(result);
// });

 //Find One and Delete
db.collection('Todos').findOneAndDelete({
  _id: new ObjectID('5d31dfc64e612a36c8a8efce')
}).then((result)=> {
  console.log(result);
})

 // db.close();
});
