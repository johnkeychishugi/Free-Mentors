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
  find(id){
    return this.datas.find( user => user.id === id );
  }
}
class DataUser{
  constructor(data,id,hash,created_at){
    this.id = id;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this.bio = data.bio;
    this.occupation = data.occupation;
    this.expertise = data.expertise;
    this.is_admin = data.is_admin;
    this.password = hash;
    this.created_at = created_at;
  }
}
export default { User, DataUser }