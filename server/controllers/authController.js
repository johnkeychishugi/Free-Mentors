import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import User from '../models/user';
import Validator from '../middlewares/validators';

const users = new User.User();

const authController = {
  signup : (req, res) => {
    const validate = Validator.schemaSignUp(req.body);
    if(!validate.error){
      users.checkIfExist(req.body.email).then(user =>{
        if(user){
          res.status(400).send({
            status: 400, 
            error:'Email already exist!!'
          });
        }else{
          bcrypt.hash(req.body.password, 10, (err, hash)=>{
            let id 
            if(users.datas.length != 0){
              id = users.datas[users.datas.length-1].id+1;
            }else{
              id = 1;
            }
            const created_at = new Date(); 
            const data = new User.DataUser(req.body,id,hash,created_at);

            users.save(data).then(response =>{
              sendToken(response,res,201);
            });
          });
        }
      });
    }else{
      res.status(422).send(validate.error);
    }
  },
  signin : (req,res) => {
    res.status(200),json('sign up pass'); 
  }
}
const sendToken = (user,res,status) =>{
  const token = jwt.sign(
    {
      email : user.email,
      userId : user.id,
      firstname : user.firstname 
    },
    config.jwt.secretKey,
    { 
      expiresIn : 3600
    }
  )
  return res.status(status).json({
    status : status,
    data : [{token : token},{user:user}]
  })
}
export default authController;
