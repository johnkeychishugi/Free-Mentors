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
  async  checkIfExist (email){
    const queryString = {
      text : 'SELECT * FROM users WHERE email=$1',
      values : [email]
    };
    const { rows }   = await pool.query(queryString);
    return rows;
  }
  async find(id){
    return this.datas.find( user => user.id === id );
  }
  async findMentors(){
    return this.datas.filter(user => user.is_mentor === true);
  }
  async findAdmins(){
    return this.datas.filter(user => user.is_admin === true);
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