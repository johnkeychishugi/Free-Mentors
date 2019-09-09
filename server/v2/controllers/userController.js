import User from '../models/user';

const users =  User.Users;

class userController{
  static async changeToMentor(req, res){  
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
  }
  static async removeToMentor(req, res){
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
  static async mentors(req, res){
    let mentors =  await users.findMentors();
    if(mentors.length != 0){
      res.status(200).json({ 
        status : 200,
        message : 'Mentors are retrieved successfully',
        data : mentors,
      });
    }else{
      res.status(404).json({
        status : 404,
        error: 'Not mentors found'
      });
    }
  }
  static async mentor(req, res){
    let [mentor] = await users.find(parseInt(req.params.mentorId));
    if(mentor){
      if(mentor.is_mentor === true){
        res.status(200).json({
          status: 200,
          message : 'Mentor is retrieved successfully',
          data: {
            id: mentor.id,
            firstname : mentor.firstname,
            lastname : mentor.lastname,
            email : mentor.email,
            address : mentor.address,
            bio : mentor.bio,
            occupation : mentor.occupation,
            expertise : mentor.expertise,
            created_at : mentor.created_at
          } 
        });
      }else{
        res.status(404).json({
          status: 404,
          error: 'This user is not a mentor'
        });
      }
    }else{
      res.status(404).json({
        status: 404,
        error: 'Mentor not found'
      });
    }
  }
  static async admins(req, res){
    let admins = await users.findAdmins();
    if(admins.length != 0){
      res.status(200).json({ 
        status : 200,
        message: 'Admins are retrieved successfully',
        data : admins
      });
    }else{
      res.status(404).json({
        status : 404,
        error: 'Not Admin found'
      });
    }
  }
}

export default userController;

