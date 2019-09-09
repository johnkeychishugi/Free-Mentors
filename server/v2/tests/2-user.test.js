import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../index';
import mockData from './mockData';

chai.use(chaiHttp);

const expect = chai.expect;
let usertoken;
let userAdmintoken;

describe('After Authentifications',() =>{
  before((done) => {
    // signin and get an access token
    chai.request(server)
      .post('/api/v2/auth/signin')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send(mockData.signin[0])
      .then(res => {
        userAdmintoken = res.body.data.token;
        done();
      });
  });
  before((done) => {
    // signup and get an access token
    chai.request(server)
      .post('/api/v2/auth/signup')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send(mockData.signup[2])
      .then(res => {
        usertoken = res.body.data.token;
        done()
      });
  });
  before((done) => {
    // mentor  users
    chai.request(server)
      .patch(`/api/v2/user/${2}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${userAdmintoken}`)  
      .then(res => {
        done()
      });
  });
  describe('Change user to Mentor',() =>{
    it('Should return an error with a 401 status when the user is not authenticated',(done) =>{
      chai.request(server)
        .patch(`/api/v2/user/${1}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should return an object with a message and 200 status when admin change user to mentor',(done) =>{
      chai.request(server)
        .patch(`/api/v2/user/${1}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userAdmintoken}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message');
          done();
        });
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
    it('Should return an object with a error and 403 status when a no admin change user to mentor',(done) =>{
      chai.request(server)
        .patch(`/api/v2/user/${1}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(403)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should return an object with a error and 404 status when admin change user to mentor but user is not found',(done) =>{
      chai.request(server)
        .patch(`/api/v2/user/${10}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userAdmintoken}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
  describe('Remove Mentor',() =>{
    it('Should return an error with a 401 status when the user is not authenticated',(done) =>{
      chai.request(server)
        .patch(`/api/v2/mentor/${1}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error');
          done();
        });
    });  
    it('Should return an object with a message and 200 status when admin remove a mentor', (done) =>{
      chai.request(server)
        .patch(`/api/v2/mentor/${1}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userAdmintoken}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('message');
          done();
        });  
    });
    it('Should return an object with a message and 403 status when a no admin remove a mentor', (done) =>{
      chai.request(server)
        .patch(`/api/v2/mentor/${1}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(403)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error');
          done();
        });  
    });
    it('Should return an object with a message and 404 status when a admin remove a mentor but mentor is not found', (done) =>{
      chai.request(server)
        .patch(`/api/v2/mentor/${10}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userAdmintoken}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error');
          done();
        });  
    });
  });
  describe('Get all mentors',() => {
    it('Should return an error with a 401 status when the user is not authenticated',(done) =>{
      chai.request(server)
        .get('/api/v2/mentors')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error');
          done();
        });
    });  
    it('Should return an object with a message and 200 to get all mentors',(done) =>{
      chai.request(server)
        .get('/api/v2/mentors')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('data');
          // needed for next test
          chai.request(server)
            .patch(`/api/v2/mentor/${2}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${userAdmintoken}`)  
            .then(res => {});
          chai.request(server)
            .patch(`/api/v2/mentor/${3}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${userAdmintoken}`)  
            .then(res => {});
          done();
        });
    });
    it('Should return an object with a error and 404 to  get all mentors but no one found  ',(done) =>{
      chai.request(server)
        .get('/api/v2/mentors')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error');
          // usefull for next test
          chai.request(server)
            .patch(`/api/v2/user/${2}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${userAdmintoken}`)  
            .then(res => {});
          done();
        });
    });   
  });
  describe('Get specific mentor',() =>{
    it('Should return an error with a 401 status when the user is not authenticated',(done) =>{  
      chai.request(server)
        .get(`/api/v2/mentors/${3}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error');
          done();
        });
    }); 
    it('Should return an error with a 404 status to get a specific mentor but the user found is not a mentor',(done) =>{  
      chai.request(server)
        .get(`/api/v2/mentors/${6}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error');
          done();
        });
    }); 
    it('Should return an error with a 404 status to get a specific mentor but the mentor is not found',(done) =>{  
      chai.request(server)
        .get(`/api/v2/mentors/${20}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error');
          done();
        });
    }); 
    it('Should return an message with a 200 status to get a specific mentor',(done) =>{  
      chai.request(server)
        .get(`/api/v2/mentors/${2}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('data');
          done();
        });
    });
  });
  describe('Get all admin',() =>{
    it('Should return an error with a 401 status when the user is not authenticated',(done) =>{  
      chai.request(server)
        .get('/api/v2/admins/')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error');
          done();
        });
    }); 
    it('Should return a message with a 200 status when a admin need to get all other admins ',(done) =>{  
      chai.request(server)
        .get('/api/v2/admins/')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userAdmintoken}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('data');
          done();
        });
    });
    it('Should return an error with a 404 status when a no admin need to get all admins ',(done) =>{  
      chai.request(server)
        .get('/api/v2/admins/')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(403)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error');
          done();
        });
    });  
  });
});

