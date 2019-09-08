import Session from '../models/session';
import User from '../models/user';
import helper  from '../helpers/general';
import Validator from '../middlewares/validators';

const sessions = Session.sessions;
const users =  User.Users;

const sessionController = {
  createSession : async (req, res) => {
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
}
const responseGetSession = (res,sessions) =>{
  if(sessions.length != 0){
    let sessionArray = [];
    sessions.forEach(session => {
      let sessionData = {
        id: session.id,
        mentorName: session.mentorName,
        mentorEmail: session.mentorEmail, 
        menteeName: session.menteeName,
        menteeEmail : session.menteeEmail,
        questions : session.questions,
        status : session.status,
        created_at : session.created_at
      }
      sessionArray.push(sessionData); 
    });
    res.status(200).json({
      status : 200,
      message : 'Session is retrieved successfully',
      data : sessionArray
    });
  }else{
    res.status(404).json({
      status : 404,
      error : 'No session found from now'
    });  
  }
}

export default sessionController;