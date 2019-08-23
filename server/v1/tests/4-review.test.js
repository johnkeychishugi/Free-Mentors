import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../index';

chai.use(chaiHttp);

const expect = chai.expect;
const should = chai.should();
let usertoken;
let userMentortoken;
let userAdmintoken;

describe('Review of sessions',() =>{
  before((done) => {
    // signin mentee and get an access token
    chai.request(server)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send({
        email: 'kalume@gmail.com',
        password : '654321'
      })
      .then(res => {
        usertoken = res.body.data.token;
        done();
      });
  });
  before((done) => {
    // signin a mentor and get an access token
    chai.request(server)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send({
        email: 'bienvenue@gmail.com',
        password : '11223344'
      })
      .then(res => {
        userMentortoken = res.body.data.token;
        done();
      });
  });
  before((done) => {
    // signin a admin and get an access token
    chai.request(server)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .set('Content-type', 'application/x-www-form-urlencoded')
      .send({
        email: 'jkchishugi@gmail.com',
        password : '123456'
      })
      .then(res => {
        userAdmintoken = res.body.data.token;
        done();
      });
  });
  describe('Creation of a review', () =>{
    it('Should return an error with a 401 status when the user is not authenticated',(done) =>{  
      chai.request(server)
        .post(`/api/v1/sessions/${1}/review`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        });
    });
    it('Should return a message with a 201 status when the mentor review a mentorship session',(done) =>{  
      chai.request(server)
        .post(`/api/v1/sessions/${1}/review`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userMentortoken}`)
        .send({
          score: 3,
          remark : 'Good job,but continous to learn by youself'
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('data')
          done();
        });
    });
    it('Should return an error with a 201 status when the mentor review a mentorship session without required credentials',(done) =>{  
      chai.request(server)
        .post(`/api/v1/sessions/${1}/review`)
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
        .post(`/api/v1/sessions/${1}/review`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userMentortoken}`)
        .send({
          score: 0,
          remark : 'Good job,but continous to learn by youself'
        })
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
        .post(`/api/v1/sessions/${1}/review`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userMentortoken}`)
        .send({
          score: 6,
          remark : 'Good job,but continous to learn by youself'
        })
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
        .post(`/api/v1/sessions/${10}/review`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userMentortoken}`)
        .send({
          score: 5,
          remark : 'Good job,but continous to learn by youself'
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        });
    });
  });
  describe('Get a review', () =>{
    it('Should return an error with a 401 status when the user is not authenticated',(done) =>{  
      chai.request(server)
        .get(`/api/v1/reviews/${1}`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        });
    });
    it('Should return a message with a 200 status when the mentee need to see the review session',(done) =>{  
      chai.request(server)
        .get(`/api/v1/reviews/${1}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('data')
          done();
        });
    });
    it('Should return an error with a 404 status when the mentee need to see the review session but the review is not found',(done) =>{  
      chai.request(server)
        .get(`/api/v1/reviews/${10}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        });
    });
  });
  describe('Delete a review by a admin', () =>{
    it('Should return an error with a 401 status when the user is not authenticated',(done) =>{  
      chai.request(server)
        .delete(`/api/v1/sessions/${1}/review`)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        });
    });
    it('Should return an error with a 403 status when a no admin try to delete a review session',(done) =>{  
      chai.request(server)
        .delete(`/api/v1/sessions/${1}/review`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${usertoken}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(403)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        });
    });
    it('Should return an error with a 404 status when a admin delete a review session but a review is not found',(done) =>{  
      chai.request(server)
        .delete(`/api/v1/sessions/${10}/review`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userAdmintoken}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        });
    });
    it('Should return a message with a 200 status when a admin delete a review session',(done) =>{  
      chai.request(server)
        .delete(`/api/v1/sessions/${1}/review`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${userAdmintoken}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('data')
          done();
        });
    });
  });
});
