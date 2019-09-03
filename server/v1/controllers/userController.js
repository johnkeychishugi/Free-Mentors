import User from '../models/user';

const users =  User.Users;

const userController = {
  changeToMentor : (req, res) => {
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
          error: 'User not found'
        });
      }
    });
  },
  removeToMentor : (req, res) => {
    users.find(parseInt(req.params.userId)).then(user =>{
      if(user){
        user.is_mentor = false;
        res.status(200).json({
          status: 200,
          data: {
            message :  'User account removed to mentors list'
          }
        });
      }else{
        res.status(404).json({
          status: 404,
          error: 'User not found'
        });
      }
    });
  },
  mentors  : (req, res) =>{
    users.findMentors().then(users =>{
      let usersArray = [];
      users.forEach(user => {
        let usetData = {
          firstname : user.firstname,
          lastname : user.lastname,
          email : user.status,
          address : user.email,
          bio : user.bio,
          occupation : user.occupation,
          expertise : user.expertise,
          is_mentor : user.is_mentor,
          created_at : user.created_at
        }
        usersArray.push(usetData); 
      });
      if(usersArray.length != 0){
        res.status(200).json({ 
          status : 200,
          data : usersArray,
        });
      }else{
        res.status(404).json({
          status : 404,
          error: 'Not mentors found'
        });
      }
    });
  },
  mentor : (req, res) =>{
    users.find(parseInt(req.params.mentorId)).then(user =>{
      if(user){
        if(user.is_mentor === true){
          res.status(200).json({
            status: 200,
            data: user 
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
    });
  },
  admins : (req, res) =>{
    users.findAdmins().then(users =>{
      if(users.length != 0){
        res.status(200).json({ 
          status : 200,
          data : users
        });
      }else{
        res.status(404).json({
          status : 404,
          error: 'Not Admin found'
        });
      }
    });
  }
}

export default userController;

