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
    return this.datas.find(data => data.id === id);
  }
  async findForMentor(id){
    return this.datas.filter(data => data.mentorId === id);
  }
  async findForMentee(id){
    return this.datas.filter(data => data.menteeId === id);
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