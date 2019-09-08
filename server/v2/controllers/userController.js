import User from '../models/user';

const users =  User.Users;

const userController = {
  changeToMentor : async (req, res) => {  
    let [user] = await users.find(parseInt(req.params.userId))
    if(user){
      let response = users.changeUserToMentor(req.params.userId);
      if(response){
        res.status(200).json({
          status: 200,
          message :  'User account changed to mentor' 
        });
      }
    }else{
      res.status(404).json({
        status: 404,
        error: 'User not found'
      });
    }
  },
  removeToMentor : async (req, res) => {
    let [user] = await users.find(parseInt(req.params.userId))
    if(user){
      let response = users.removeToMentor(req.params.userId);
      if(response){
        res.status(200).json({
          status: 200,
          message :  'User account removed to mentors list' 
        });
      }
    }else{
      res.status(404).json({
        status: 404,
        error: 'User not found'
      });
    }
  }
}

export default userController;

