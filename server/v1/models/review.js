class Review {
  constructor(){
    this.datas = []
  }
  async save(review) {
    this.datas.push(review);
    return this.datas[this.datas.length - 1];
  }
  async delete(id) {
    let deleted;
    for (const index in this.datas) {
      if (this.datas[index].sessionId === id ) {
        deleted = this.datas.splice(index, 1);
      }
    }
    if(deleted){
      return true;
    }else{
      return false;
    }
  }
  async find(id){
    return this.datas.find( review => review.id === id );
  }
}

class DataReview {
  constructor(session,data,id,menteeFullName,created_at){
    this.id = id;
    this.sessionId = session.id;
    this.mentorId = session.mentorId;
    this.mentorName = session.mentorName;
    this.menteeId = session.menteeId;
    this.score = data.score;
    this.menteeFullName = menteeFullName;
    this.remark = data.remark;
    this.created_at = created_at;
  }
}

const reviews = new Review;

export default { reviews, DataReview };