import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../index';
import mockData from './mockData';


chai.use(chaiHttp);

const expect = chai.expect;
let token;

describe('Authentifications',()=>{
  before((done) => {
    // signup and get an access token
    chai.request(server)
      .post('/api/v2/auth/signup')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send(mockData.signup[0])
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
  it('Should return an error with 405 status when the user accesses a wrong endpoint', (done) => {
    chai
      .request(server)
      .get('/v211/wrong-endpoint')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(405)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('message');
        done();
      })
  });
  it('Should return an html page with 200 status when users access api documentation', (done) => {
    chai.request(server)
      .get('/api/v2/api-docs')
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
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send(mockData.signup[1])
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
        .post('/api/v2/auth/signup')
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
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send(mockData.signup[1])
        .end((err, res) =>{
          if (err) done(err);
          res.body.should.have.status(409)
          res.body.should.be.an('Object')
          res.body.should.have.property('error')
          done()
        })
    });
    it('Should return an object message with status 200 to set admin', (done) => {
      chai.request(server)
        .patch(`/api/v2/auth/${2}/setadmin`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message');
          done();
        })
    });
    it('Should return an error  with status 404 to set admin but, user is not found', (done) => {
      chai.request(server)
        .patch(`/api/v2/auth/${200}/setadmin`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error');
          done();
        })
    });
  });
  describe('Sign In',() =>{
    it('Should return an object with a data -> token when the user signs in with valid credentials', (done) => {
      chai.request(server)
        .post('/api/v2/auth/signin')
        .set('Accept', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send(mockData.signin[0])
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
        .post('/api/v2/auth/signin')
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
        .post('/api/v2/auth/signin')
        .set('Accept', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send(mockData.signin[1])
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        })
    });
    it('Should return an object with an error when the user signs in with an incorrect password', (done) => {
      chai.request(server)
        .post('/api/v2/auth/signin')
        .set('Accept', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send({
          email: 'iragi@gmail.com',
          password : 'Ch@1234560' })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        })
    });
  });
  describe('Update Profile',() =>{
    it('Should return an object with a message when the user update profile', (done) => {
      chai.request(server)
        .patch('/api/v2/auth/updateProfile')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send(mockData.updateProfile[0])
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('data')
          done();
        })
    });
    it('Should return an error 409 with a message when the user update profile but no change', (done) => {
      chai.request(server)
        .patch('/api/v2/auth/updateProfile')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send(mockData.updateProfile[1])
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(409)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        })
    });

    it('Should return an object with a message when the user update profile without required credentials', (done) => {
      chai.request(server)
        .patch('/api/v2/auth/updateProfile')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
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
    
  });
  describe('Change password',() =>{
    it('Should return an object with a message when the user change the password', (done) => {
      chai.request(server)
        .patch('/api/v2/auth/changepassword')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send(mockData.changepass[0])
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message')
          done();
        })
    });
    it('Should return an object with an error when the user change the password without required credentials', (done) => {
      chai.request(server)
        .patch('/api/v2/auth/changepassword')
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
        .patch('/api/v2/auth/changepassword')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send(mockData.changepass[1])
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
        .patch('/api/v2/auth/changepassword')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send(mockData.changepass[2])
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        })
    });
  });
});
