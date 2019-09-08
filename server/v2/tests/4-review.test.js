import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../index';
import mockData from './mockData';

chai.use(chaiHttp);

const expect = chai.expect;
let usertoken;
let userMentortoken;
let userAdmintoken;

describe('Review of sessions',() =>{
  before((done) => {
    // signin mentee and get an access token
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
    // signin a mentor and get an access token
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
    // signin a admin and get an access token
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
  describe('Creation of a review', () =>{
    it('Should return an error with a 401 status when the user is not authenticated',(done) =>{  
      chai.request(server)
        .post(`/api/v2/sessions/${1}/review`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        });
    });
    it('Should return an error with a 403 status when a no mentor review a mentorship session while is not a mentor',(done) =>{  
      chai.request(server)
        .post(`/api/v2/sessions/${1}/review`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${usertoken}`)
        .send(mockData.review[0])
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(403)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        });
    });
    it('Should return a message with a 201 status when the mentor review a mentorship session',(done) =>{  
      chai.request(server)
        .post(`/api/v2/sessions/${1}/review`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userMentortoken}`)
        .send(mockData.review[0])
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('data')
          done();
        });
    });
    it('Should return a message with a 201 status when the mentor review a mentorship session',(done) =>{  
      chai.request(server)
        .post(`/api/v2/sessions/${2}/review`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userMentortoken}`)
        .send(mockData.review[0])
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('data')
          done();
        });
    });
    it('Should return an error with a 409 status when the mentor review twice a mentorship session',(done) =>{  
      chai.request(server)
        .post(`/api/v2/sessions/${1}/review`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userMentortoken}`)
        .send(mockData.review[0])
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(409)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        });
    });
    it('Should return an error with a 409 status when the mentor review twice a mentorship session',(done) =>{  
      chai.request(server)
        .post(`/api/v2/sessions/${2}/review`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userMentortoken}`)
        .send(mockData.review[0])
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(409)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        });
    });
    it('Should return an error with a 422 status when the mentor review a mentorship session without required credentials',(done) =>{  
      chai.request(server)
        .post(`/api/v2/sessions/${1}/review`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userMentortoken}`)
        .send()
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        });
    });
    
    it('Should return an error with a 422 status when the mentor review a mentorship session with a score less then 1 ',(done) =>{  
      chai.request(server)
        .post(`/api/v2/sessions/${1}/review`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userMentortoken}`)
        .send(mockData.review[1])
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        });
    });
    it('Should return an error with a 422 status when the mentor review a mentorship session with a score great then 5 ',(done) =>{  
      chai.request(server)
        .post(`/api/v2/sessions/${1}/review`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userMentortoken}`)
        .send(mockData.review[2])
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(422)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        });
    });
    it('Should return an error with a 404 status when the mentor review a mentorship session but session is not found',(done) =>{  
      chai.request(server)
        .post(`/api/v2/sessions/${10}/review`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userMentortoken}`)
        .send(mockData.review[0])
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        });
    });
  });
});
