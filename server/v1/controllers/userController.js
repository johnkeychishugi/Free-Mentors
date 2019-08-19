import User from '../models/user';

const users =  User.Users;

const userController = {
  changeToadmin : (req, res, next) => {
    users.find(parseInt(req.params.userId)).then(user =>{
      if(user){
        user.is_mentor = true;
        res.status(200).json({
          status: 200,
          data: {
            message :  'User account changed to mentor'
          }
        });
      }else{
        res.status(404).json({
          status: 404,
          error: "User not found"
        });
      }
    });
  }
}

export default userController;

