import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import helper  from '../helpers/general';
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
          res.status(409).send({
            status: 409,
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
            const created_at = new Date().toDateString(); 
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
  },
  changePassword : (req, res) => {
    const user = helper.authUser(req.headers.authorization);
    const validate = Validator.schemaChangePassword(req.body);
    if(!validate.error){
      users.find(parseInt(user.userId)).then(user =>{
        if(user){
          bcrypt.compare(req.body.old_password, user.password, (err,result)=>{
            if(result){
              bcrypt.hash(req.body.new_password, 10, (err, hash)=>{
                user.password = hash;
                res.status(200).json({
                  status: 200, 
                  message : 'Password change succuefully'
                });
              });
            }else{
              res.status(400).json({
                status : 400,
                error : 'Current password incorrect'
              })
            }
          })
        }
      });
    }else{
      res.status(422).send({status: 422, error: validate.error});
    }
    
  },
  updateProfile : (req, res) =>{
    const user = helper.authUser(req.headers.authorization);
    const validate = Validator.schemaAddInfos(req.body);
    
    if(!validate.error){
      users.find(parseInt(user.userId)).then(user =>{
        if(user){
          if(!(user.address == req.body.address && user.bio == req.body.bio && 
             user.occupation == req.body.occupation && user.expertise == req.body.expertise)){
             
            user.address = req.body.address;
            user.bio = req.body.bio;
            user.occupation = req.body.occupation;
            user.expertise = req.body.expertise;
    
            res.status(200).json({
              status: 200, 
              message : 'Profile Updated succuefully',
              data:{
                id: user.id,
                firstname : user.firstname,
                lastname : user.lastname,
                email : user.email,
                address : user.address,
                bio : user.bio,
                occupation : user.occupation,
                expertise : user.occupation,
                is_mentor : user.is_mentor,
                created_at : user.created_at
              }
            });
          }else{
            res.status(409).json({
              status : 409,
              error : 'Duplication of data'
            })
          }
        
        }
      });
    }else{
      res.status(422).send({status: 422, error: validate.error});
    }

  },
  setadmin : (req, res) =>{
    users.find(parseInt(req.params.userid)).then(user =>{
      if(user){
        user.is_admin = true;
        res.status(200).json({
          status: 200, 
          message : 'user set to admin succuefully',
          data:{
            id: user.id,
            firstname : user.firstname,
            lastname : user.lastname,
            email : user.email,
            address : user.address,
            bio : user.bio,
            occupation : user.occupation,
            expertise : user.occupation,
            is_admin : user.is_admin,
            created_at : user.created_at
          } 
        });
      }else{
        res.status(404).json({
          status : 404,
          error: 'No user found'
        });
      }
    });
  }
}
const sendToken = (user,res,status,msg) =>{
  const token = jwt.sign(
    {
      email : user.email,
      userId : user.id,
      firstname : user.firstname,
      is_admin : user.is_admin,
      is_mentor : user.is_mentor
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

