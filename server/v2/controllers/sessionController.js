import Session from '../models/session';
import User from '../models/user';
import helper  from '../helpers/general';
import Validator from '../middlewares/validators';

const sessions = Session.sessions;
const users =  User.Users;

class sessionController{
  static async createSession(req, res){
    req.body.mentorId = parseInt(req.body.mentorId);
    const validate = Validator.schemaSession(req.body);
    if(!validate.error){
      const user = helper.authUser(req.headers.authorization);
      let [mentor] = await users.find(parseInt(req.body.mentorId));
      if(mentor && mentor.is_mentor === true ){

        const data = new Session.DataSession(req.body,user);
        let [session] = await  sessions.save(data);
        if(session){
          res.status(201).json({
            status : 201,
            message : 'Session created succuefully',
            data : session
          });
        }
      }else{
        res.status(404).json({
          status: 404,
          error: 'Mentor not found'
        });
      }
    }else{
      res.status(422).send({status: 422, error: validate.error});
    }   
  }
  static async acceptSession(req, res){
    const id = parseInt(req.params.sessionId);
    let [session] = await sessions.find(id);
    if(session){
      let response = await sessions.acceptSession(id); 
      if(response){
        res.status(200).json({
          status : 200,
          message : 'session accepted succuefully',
          data : response
        });
      }
    }else{
      res.status(404).json({
        status : 404,
        error : 'Session mentorship not found'
      });
    }
  }
  static async rejectSession(req, res){
    const id = parseInt(req.params.sessionId);
    let [session] = await sessions.find(id);
    if(session){
      let response = await sessions.rejectSession(id); 
      if(response){
        res.status(200).json({
          status : 200,
          message : 'session rejected succuefully',
          data : response
        });
      }
    }else{
      res.status(404).json({
        status : 404,
        error : 'Session mentorship not found'
      });
    } 
  }
  static async getSession(req, res){
    const authUser = helper.authUser(req.headers.authorization);
    let [user] = await  users.find(authUser.userId);
    if(user){
      if(user.is_mentor){
        let response = await sessions.findForMentor(user.id);
        responseGetSession(res,response);
      }else{
        let response = await sessions.findForMentee(user.id);
        responseGetSession(res,response);
      }
    }else{
      res.status(404).json({
        status : 404,
        error : 'user not found'
      }); 
    }
  }
}
const responseGetSession = (res,sessions) =>{
  if(sessions.length != 0){
    res.status(200).json({
      status : 200,
      message : 'Session is retrieved successfully',
      data : sessions
    });
  }else{
    res.status(404).json({
      status : 404,
      error : 'No session found from now'
    });  
  }
}

export default sessionController;