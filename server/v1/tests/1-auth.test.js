import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../index';

chai.use(chaiHttp);

const expect = chai.expect;
const should = chai.should();
let token;

describe('Authentifications',()=>{
  before((done) => {
    // signup and get an access token
    chai.request(server)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send({
        firstname : 'Aristotle',
        lastname : 'Kalume',
        email : 'kalume@gmail.com',
        address : 'Gisozi Kigali',
        bio : 'Born to worship',
        occupation : 'Programmer',
        expertise : 'Software developer',
        password : '123456',
        confirmPassword : '123456'
      })
      .then(res => {
        token = res.body.data.token;
        done();
      });
  });
  it('Should return an object with a message and 200 status when user accesses the root', (done) => {
    chai.request(server)
      .get('/')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('message');
        done();
      })
  });
  it('Should return an error with 404 status when the user accesses a wrong endpoint', (done) => {
    chai
      .request(server)
      .get('/v111/wrong-endpoint')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('message');
        done();
      })
  });
  it('Should return an html page with 200 status when users access api documentation', (done) => {
    chai.request(server)
      .get('/api/v1/api-docs')
      .set('Content-type', 'text/html')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200)
        expect(res.headers['content-type']).to.equal('text/html; charset=utf-8')
        done();
      })
  });
  describe('Sign Up', ()=>{
    it('Should register with 201 status and give the token', (done)=>{
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send({
          firstname : 'John',
          lastname : 'Chishugi',
          email : 'jkchishugi@gmail.com',
          address : 'Gisozi Kigali',
          bio : 'Born to worship',
          occupation : 'Programmer',
          expertise : 'Software developer',
          password : '123456',
          confirmPassword : '123456',
          is_admin : true
        })
        .end((err, res) =>{
          if (err) done(err);
          res.body.should.have.status(201)
          res.body.should.be.an('Object')
          res.body.should.have.property('data')
          done()
        })
    });
    it('Should return an object with status 422 when a user signs up without required credentials', (done)=>{
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send()
        .end((err, res) =>{
          if (err) done(err);
          res.body.should.have.status(422)
          res.body.should.be.an('Object')
          res.body.should.have.property('error')
          done()
        })
    });
    it('Should return an error with 400 when the user attempting to be created already exists', (done)=>{
      chai.request(server)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send({
          firstname : 'John',
          lastname : 'Chishugi',
          email : 'jkchishugi@gmail.com',
          address : 'Gisozi Kigali',
          bio : 'Born to worship',
          occupation : 'Programmer',
          expertise : 'Software developer',
          password : '123456',
          confirmPassword : '123456',
          is_admin : true
        })
        .end((err, res) =>{
          if (err) done(err);
          res.body.should.have.status(400)
          res.body.should.be.an('Object')
          res.body.should.have.property('error')
          done()
        })
    });
  });
  describe('Sign In',() =>{
    it('Should return an object with a data -> token when the user signs in with valid credentials', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send({
          email: 'jkchishugi@gmail.com',
          password : '123456'
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('data')
          done();
        })
    });
    it('Should return an object with an error when the user signs in without email or password', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send({})
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        })
    });
    it('Should return an object with an error when the user signs in with an incorrect email or password', (done) => {
      chai.request(server)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send({
          email: 'jkchishugi@popmooder.com',
          password : '87654321'
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        })
    });
  });
  describe('Change password',() =>{
    it('Should return an object with a message when the user change the password', (done) => {
      chai.request(server)
        .patch('/api/v1/auth/changepassword')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send({
          old_password: '123456',
          new_password : '654321',
          confirm_new_password : '654321'
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('data')
          done();
        })
    });
    it('Should return an object with an error when the user change the password without required credentials', (done) => {
      chai.request(server)
        .patch('/api/v1/auth/changepassword')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send()
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        })
    });
    it('Should return an object with an error when the user change the  password but the old password is incorrect ', (done) => {
      chai.request(server)
        .patch('/api/v1/auth/changepassword')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send({
          old_password: '1234567',
          new_password : '654321',
          confirm_new_password : '654321'
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        })
    });
    it('Should return an object with an error when the user change the  password but the new password is not match with confirm new password ', (done) => {
      chai.request(server)
        .patch('/api/v1/auth/changepassword')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send({
          old_password: '123456',
          new_password : '654321',
          confirm_new_password : '6543217'
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        })
    });
  })
});
