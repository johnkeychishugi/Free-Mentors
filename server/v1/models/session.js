class session {
  constructor(){
    this.datas=[];
  }
  async save(session){
    this.datas.push(session);
    return this.datas[this.datas.length - 1];
  }
  async find(id){
    return this.datas.find(data => data.id === id);
  }
}
class DataSession {
  constructor(mentor,id,mentee,created_at){
    this.id = id,
    this.mentorId = parseInt(mentor.mentorId);
    this.menteeId = parseInt(mentee.userId);
    this.questions = mentor.questions;
    this.menteeEmail = mentee.email;
    this.status = 'pending';
    this.created_at = created_at

  }
}
const sessions = new session
export default { sessions, DataSession };