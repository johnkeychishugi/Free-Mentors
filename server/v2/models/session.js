import pool from '../config/db.config';

class Session {
  async save(session){
    const { mentorId,menteeId,questions,status} = session;
    const queryString = {
      text: `INSERT INTO sessions
            (mentorId,menteeId,questions,status)
            VALUES($1, $2, $3, $4) RETURNING*;`,
      values: [mentorId,menteeId,questions,status]
    };
    const { rows } = await pool.query(queryString);
    return rows;
  }
  async find(id){
    const queryString = {
      text : 'SELECT * FROM sessions WHERE id=$1',
      values : [id]
    };
    const { rows }   = await pool.query(queryString);
    return rows;
  }
  async acceptSession(id){
    const queryString = {
      text : `UPDATE sessions SET status=$1
      WHERE id=$2 RETURNING*`,
      values : ['accepted',id]
    }
    const { rows } = await pool.query(queryString);
    return rows[0];
  }
  async rejectSession(id){
    const queryString = {
      text : `UPDATE sessions SET status=$1
      WHERE id=$2 RETURNING*`,
      values : ['rejected',id]
    }
    const { rows } = await pool.query(queryString);
    return rows[0];
  }
  async findForMentor(id){
    const queryString = {
      text : `SELECT s.id,s.menteeId,s.mentorId,s.questions,s.status,u.firstname as menteeFirstname,u.lastname as menteeLastname,u.email as menteeEmail 
              FROM sessions as s INNER JOIN Users as u ON s.menteeId = u.id WHERE mentorId=$1`,
      values : [id]
    };
    const { rows }   = await pool.query(queryString);
    return rows;
  }
  async findForMentee(id){
    const queryString = {
      text : `SELECT s.id,s.menteeId,s.mentorId,s.questions,s.status,u.firstname as mentorFirstname,u.lastname as mentorLastname,u.email as mentorEmail
              FROM sessions as s INNER JOIN Users as u ON s.mentorId = u.id WHERE menteeId=$1`,
      values : [id]
    };
    const { rows }   = await pool.query(queryString);
    return rows;
  }
}
class DataSession {
  constructor(body,mentee){
    this.mentorId = parseInt(body.mentorId);
    this.menteeId = parseInt(mentee.userId);
    this.questions = body.questions;
    this.status = 'pending';  
  }
}
const sessions = new Session;
export default { sessions, DataSession };