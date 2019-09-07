import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import helper  from '../helpers/general';
import Validator from '../middlewares/validators';

import dotenv from 'dotenv';
dotenv.config();

const users =  User.Users;

const authController = {
  signup : async (req, res) => {
    const validate = Validator.schemaSignUp(req.body);
    if(!validate.error){
      let user = await users.checkIfExist(req.body.email);
      if(user.length){
        res.status(409).send({
          status: 409, 
          error:'Email already exist!!'
        });
      }else{
        bcrypt.hash(req.body.password, 10, async (err, hash)=>{
          const data = new User.DataUser(req.body,hash);
          let [response]  =  await users.save(data);
          sendToken(response,res,201,'User created successfully');
        });
      } 
    }else{
      res.status(422).send({status: 422, error: validate.error});
    }
  },
  signin : async (req,res) => {
    const validate = Validator.schemaSignIn(req.body);
    if(!validate.error){
      let [user] = await users.checkIfExist(req.body.email);
      if(user){
        bcrypt.compare(req.body.password,user.password, async(err,result)=>{
          if(result){
            sendToken(user, res, 200,'User is successfully logged in');
          }else{
            authFails(res);
          }
        });
      }else{
        authFails(res); 
      }
    }else{
      res.status(422).send({status: 422, error: validate.error});
    }
  },
  updateProfile : async (req, res) =>{
    const authUser = helper.authUser(req.headers.authorization);
    const validate = Validator.schemaUpdateProfile(req.body);
    
    if(!validate.error){
      let [user] = await users.find(parseInt(authUser.userId))
      if(user){
        if(!(user.address == req.body.address && user.bio == req.body.bio && 
             user.occupation == req.body.occupation && user.expertise == req.body.expertise)){

          let userUpadated = await users.updateProfile(req.body,authUser.userId);
          res.status(200).json({
            status: 200, 
            message : 'Profile Updated succuefully',
            data:userUpadated
          });
        }else{
          res.status(409).json({
            status : 409,
            error : 'Duplication of data'
          })
        }
        
      }
    }else{
      res.status(422).send({status: 422, error: validate.error});
    }
  },
  changePassword : async (req, res) => {
    const authUser = helper.authUser(req.headers.authorization);
    const validate = Validator.schemaChangePassword(req.body);
    if(!validate.error){
      let [user] = await users.find(parseInt(authUser.userId))
      if(user){
        bcrypt.compare(req.body.old_password, user.password, (err,result)=>{
          if(result){
            bcrypt.hash(req.body.new_password, 10, async (err, hash)=>{
              let response = await users.changePassword(authUser.userId,hash);
              if(response){
                res.status(200).json({
                  status: 200, 
                  message : 'Password change succuefully'
                });
              }
            });
          }else{
            res.status(400).json({
              status : 400,
              error : 'Current password incorrect'
            })
          }
        })
      }
    }else{
      res.status(422).send({status: 422, error: validate.error});
    } 
  },
  setadmin : async (req, res) =>{
    let [user] = await users.find(parseInt(req.params.userid))
    if(user){
      let setUserAdmin = await users.setUserAdmin(parseInt(req.params.userid));
      res.status(200).json({
        status: 200, 
        message : 'Profile Updated succuefully',
        data: setUserAdmin
      });
    }else{
      res.status(404).json({
        status : 404,
        error: 'No user found'
      });
    }
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
  );
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

