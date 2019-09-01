const expect = require('expect'); //validation of test cases
const request = require('supertest'); //test module

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// Dummy Todos
const todos= [{
  text: 'First test todo'
}, {
  text: 'Second test todo'
}];

beforeEach((done) => {
  //DB should be empty before test case since expected length is '1'
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(()=> done());
  //Blank object ({}) refers to all objects
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos') //post method
      .send({text}, 'application/json')
      .expect(200)  //OK Status Code
      .expect((res) => {
        expect(res.body.text).toBe(text);
        // text: Test todo text
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          //Single {text} of todos
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });
// An invalid test case which is not going to create any data
  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({}, 'application/json')
      .expect(400) //Error Status Code
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          //If not creating anything, length should be 0
          //Else length should be equal to length of todos object
          done();
        }).catch((e) => done(e));
      });
  });
});


describe('GET /todos', ()=> {
  it('should get all todos', (done)=> {
    request(app)
      .get('/todos') //get methodes
      .expect(200)
      .expect((res)=> {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  })
})






// Output:
// Started on port 3000
  // POST /todos
  //   √ should create a new todo (44ms)
  //   √ should not create todo with invalid body data
  //
  // GET /todos
  //   √ should get all todos
  //
  //
  // 3 passing (104ms)
