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
  });