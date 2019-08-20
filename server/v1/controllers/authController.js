import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Validator from '../middlewares/validators';
import dotenv from 'dotenv';
dotenv.config();

const users =  User.Users;

const authController = {
  signup : (req, res) => {
    const validate = Validator.schemaSignUp(req.body);
    if(!validate.error){
      users.checkIfExist(req.body.email).then(user =>{
        if(user){
          res.status(400).send({
            status: 401, 
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
              sendToken(response,res,201,'User created successfully');
            });
          });
        }
      });
    }else{
      res.status(422).send({status: 422, error: validate.error});
    }
  },
  signin : (req,res) => {
    const validate = Validator.schemaSignIn(req.body);
    if(!validate.error){
      users.checkIfExist(req.body.email).then(user =>{
        if(user){
          bcrypt.compare(req.body.password, user.password, (err,result)=>{
            if(result){
              sendToken(user, res, 200,'User is successfully logged in')
            }else{
              authFails(res); 
            }
          })
        }else{
          authFails(res); 
        }
      });
    }else{
      res.status(422).send({status: 422, error: validate.error});
    }
  }
}
const sendToken = (user,res,status,msg) =>{
  const token = jwt.sign(
    {
      email : user.email,
      userId : user.id,
      firstname : user.firstname,
      is_admin : user.is_admin 
    },
    process.env.TOKEN_KEY,
    { 
      expiresIn : '2h'
    }
  )
  return res.status(status).json({
    status : status,
    message : msg,
    data : {token : token}
  })
}
const authFails = (res) =>{
  return res.status(401).json({
    status : 401,
    error : 'Authentication failed, please check your credentials'
  })
}
export default authController;

