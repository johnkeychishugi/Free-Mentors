import pool from '../config/db.config';

class Review {
  async save(review) {
    const { sessionId,score,remark} = review;
    const queryString = {
      text: `INSERT INTO reviews
            (sessionId,score,remark)
            VALUES($1, $2, $3) RETURNING*;`,
      values: [sessionId,score,remark]
    };
    const { rows } = await pool.query(queryString);
    return rows;
  }
  async delete(id) {
    const queryString = {
      text : 'DELETE FROM reviews WHERE sessionId= $1 RETURNING*',
      values : [id]
    };
    const { rows }   = await pool.query(queryString);
    return rows;
  }
  async find(id){
    const queryString = {
      text : 'SELECT * FROM reviews WHERE id=$1',
      values : [id]
    };
    const { rows }   = await pool.query(queryString);
    return rows;
  }
  async findBysessionId(id){
    const queryString = {
      text : 'SELECT * FROM reviews WHERE sessionId=$1',
      values : [id]
    };
    const { rows }   = await pool.query(queryString);
    return rows;
  }
}

class DataReview {
  constructor(session,data){
    this.sessionId = session.id;
    this.score = data.score;
    this.remark = data.remark;
  }
}

const reviews = new Review;

export default { reviews, DataReview };