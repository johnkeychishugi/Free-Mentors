import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../index';
import mockData from './mockData';


chai.use(chaiHttp);

const expect = chai.expect;
const should = chai.should();
let usertoken;
let userMentortoken;

describe('Sessions',() =>{
  before((done) => {
    // signin and get an access token
    chai.request(server)
      .post('/api/v2/auth/signin')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send(mockData.signin[2])
      .then(res => {
        usertoken = res.body.data.token;
        done();
      });
  });
  before((done) => {
    // signin and get an access token
    chai.request(server)
      .post('/api/v2/auth/signin')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send(mockData.signin[4])
      .then(res => {
        userMentortoken = res.body.data.token;
        done();
      });
  });
  before((done) => {
    // creation of session
    chai.request(server)
      .post('/api/v2/sessions')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${usertoken}`)
      .send(mockData.session[0])
      .then(res => {
        done()
      });
  });
  describe('Creation of a session', () =>{
    it('Should return an error with a 401 status when the user is not authenticated',(done) =>{  
      chai.request(server)
        .post('/api/v2/sessions')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should return a message with a 201 status when the user send a request session of mentorship to a mentor',(done) =>{  
      chai.request(server)
        .post('/api/v2/sessions')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${usertoken}`)
        .send(mockData.session[0])
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('data');
          done();
        });
    }); 
    it('Should return an error with a 422 status when the user send a request session without required credentials',(done) =>{  
      chai.request(server)
        .post('/api/v2/sessions')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${usertoken}`)
        .send()
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error');
          done();
        });
    }); 
    it('Should return an error with a 404 status when the user send a request session of mentorship to a mentor but mentor is not found',(done) =>{  
      chai.request(server)
        .post('/api/v2/sessions')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${usertoken}`)
        .send(mockData.session[1])
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error');
          done();
        });
    });  
  });
  describe('Mentor can accept a mentorship session', () =>{
    it('Should return an error with a 401 status when the user is not authenticated',(done) =>{  
      chai.request(server)
        .patch(`/api/v2/sessions/${1}/accept`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should return an error with a 403 status when a no mentor try to accept a mentorship session while is not a mentor',(done) =>{  
      chai.request(server)
        .patch(`/api/v2/sessions/${1}/accept`)
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
    it('Should return a message with a 200 status when the mentor accept a mentorship session',(done) =>{  
      chai.request(server)
        .patch(`/api/v2/sessions/${1}/accept`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userMentortoken}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('data');
          done();
        });
    });
    it('Should return an error with a 404 status when the mentor accept a mentorship session but session is not found',(done) =>{  
      chai.request(server)
        .patch(`/api/v2/sessions/${10}/accept`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userMentortoken}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
  describe('Mentor can reject a mentorship session', () =>{
    it('Should return an error with a 401 status when the user is not authenticated',(done) =>{  
      chai.request(server)
        .patch(`/api/v2/sessions/${2}/reject`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('Should return a message with a 403 status when a no mentor try reject a mentorship session while is not a mentor',(done) =>{  
      chai.request(server)
        .patch(`/api/v2/sessions/${2}/reject`)
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
    it('Should return a message with a 200 status when the mentor reject a mentorship session',(done) =>{  
      chai.request(server)
        .patch(`/api/v2/sessions/${2}/reject`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userMentortoken}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('data');
          done();
        });
    });
    it('Should return an error with a 404 status when the mentor reject a mentorship session but session is not found',(done) =>{  
      chai.request(server)
        .patch(`/api/v2/sessions/${10}/reject`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userMentortoken}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
  describe('Get all mentorship session requests', () =>{
    describe('For a mentor', () => {
      it('Should return an error with a 401 status when the mentor is not authenticated',(done) =>{  
        chai.request(server)
          .get('/api/v2/sessions')
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (err) done(err);
            expect(res).to.have.status(401)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('error');
            done();
          });
      });
      it('Should be a list of all mentorship request sessions created against the mentor',(done) =>{  
        chai.request(server)
          .get('/api/v2/sessions')
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${userMentortoken}`)
          .end((err, res) => {
            if (err) done(err);
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('data');
            done();
          });
      });
    });
    describe('For a user (mentee)', () => {
      it('Should return an error with a 401 status when the mentee is not authenticated',(done) =>{  
        chai.request(server)
          .get('/api/v2/sessions')
          .set('Accept', 'application/json')
          .end((err, res) => {
            if (err) done(err);
            expect(res).to.have.status(401)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('error');
            done();
          });
      });
      it('Should be a list of all mentorship request sessions created by the user',(done) =>{  
        chai.request(server)
          .get('/api/v2/sessions')
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
  })
});

