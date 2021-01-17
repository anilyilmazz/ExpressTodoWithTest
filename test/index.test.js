const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const server = require('../index');

describe('Node Server', () => {

    /**
     * Test the GET route
    */
    describe('GET(/) Home Page', () => {
      it('Home page status 200?', (done) => {
        chai.request(server).get('/').end((err, res) => {
          res.should.have.status(200)
          done();
        });
      });
    });

    /**
     * Test the POST route
     */
    describe("POST /", () => {
        it("It should POST a new todo", (done) => {
            const todo = {
                name: "Task 4"
            };
            chai.request(server)                
                .post("/")
                .send(todo)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('name').eq("Task 4");
                    response.body.should.have.property('status').eq(false);
                done();
                });
        });

        it("It should NOT POST a new todo without the name property", (done) => {
            const todo = {};
            chai.request(server)                
                .post("/")
                .send(todo)
                .end((err, response) => {
                    response.should.have.status(400);
                    expect(response.body.text).to.equal('name is empty');
                done();
                });
        });
    });
});

