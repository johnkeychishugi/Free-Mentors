import User from '../models/user';

const users =  User.Users;
export default  (req,res,next) => {
  users.find(req.userData.userId).then(user =>{
    if(!user.is_admin){
      return res.status(403).json({
        status : 403,
        error : 'Only admins can perform this action',
      });
    }else{
      next();
    }
  })
}