import pool from '../config/db.config';

class User {
  async save(user){
    const { firstname,lastname,email,password} = user;
    const queryString = {
      text: `INSERT INTO users
            (firstname,lastname,email,password)
            VALUES($1, $2, $3, $4) RETURNING*;`,
      values: [firstname,lastname,email,password]
    };
    const { rows } = await pool.query(queryString);
    return rows;
  }
  async updateProfile(data,id){
    const { address,bio,occupation,expertise} = data;
    const queryString = {
      text : `UPDATE users SET address=$1, bio=$2, occupation=$3 ,expertise=$4
      WHERE id=$5 RETURNING id,firstname,lastname,email,address,bio,occupation,expertise,is_mentor`,
      values : [address,bio,occupation,expertise,id]
    }
    const { rows } = await pool.query(queryString);
    return rows[0];
  }
  async  checkIfExist (email){
    const queryString = {
      text : 'SELECT * FROM users WHERE email=$1',
      values : [email]
    };
    const { rows }   = await pool.query(queryString);
    return rows;
  }
  async find(id){
    const queryString = {
      text : 'SELECT * FROM users WHERE id=$1',
      values : [id]
    };
    const { rows }   = await pool.query(queryString);
    return rows;
  }
}
class DataUser{
  constructor(data,hash){
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this.password = hash;
  }
}
const Users = new User();
export default { Users, DataUser }