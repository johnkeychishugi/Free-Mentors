  class User {
  constructor(){
    this.datas=[];
  }
  async save(user){
    this.datas.push(user);
    return this.datas.find( data => data.email === user.email );
  }
  async  checkIfExist (email){
    return this.datas.find( user => user.email === email );
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
  constructor(data,id,hash,created_at){
    this.id = id;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this.address = null;
    this.bio = null;
    this.occupation = null;
    this.expertise = null;
    this.is_admin =  false;
    this.is_mentor = false;
    this.password = hash;
    this.created_at = created_at;
  }
}
const Users = new User();
export default { Users, DataUser }