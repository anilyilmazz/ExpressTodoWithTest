const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const should = chai.should();
const server = require('../index');

describe('Node Server', () => {
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
    describe("POST /api/tasks", () => {
        it("It should POST a new task", (done) => {
            const task = {
                name: "Task 4",
                completed: false
            };
            chai.request(server)                
                .post("/api/tasks")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eq(4);
                    response.body.should.have.property('name').eq("Task 4");
                    response.body.should.have.property('completed').eq(false);
                done();
                });
        });

        it("It should NOT POST a new task without the name property", (done) => {
            const task = {
                completed: false
            };
            chai.request(server)                
                .post("/api/tasks")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.text.should.be.eq("The name should be at least 3 chars long!");
                done();
                });
        });

    });

});

