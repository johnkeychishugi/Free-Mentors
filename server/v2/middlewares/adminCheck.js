import User from '../models/user';

const users =  User.Users;
export default  async (req,res,next) => {
  let [user] = await users.find(req.userData.userId)
  if(!user.is_admin){
    return res.status(403).json({
      status : 403,
      error : 'Only admins can perform this action',
    });
  }else{
    next();
  }
}