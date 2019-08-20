class Review {
  constructor(){
    this.datas = []
  }
  async save(review) {
    this.datas.push(review);
    return this.datas[this.datas.length - 1];
  }
}

class DataReview {
  constructor(session,data,id,menteeFullName,created_at){
    this.id = id;
    this.sessionId = session.id;
    this.mentorId = session.mentorId;
    this.menteeId = session.menteeId;
    this.score = data.score;
    this.menteeFullName = menteeFullName;
    this.remark = data.remark;
    this.created_at = created_at;
  }
}

const reviews = new Review;

export default { reviews, DataReview };