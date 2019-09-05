import Session from '../models/session';
import User from '../models/user';
import helper  from '../helpers/general';
import Validator from '../middlewares/validators';


const sessions = Session.sessions;
const users =  User.Users;

const sessionController = {
  createSession : (req, res) => {
    req.body.mentorId = parseInt(req.body.mentorId);
    const validate = Validator.schemaSession(req.body);
    if(!validate.error){
      const user = helper.authUser(req.headers.authorization);
      users.find(parseInt(req.body.mentorId)).then(mentor =>{
        if(mentor && mentor.is_mentor === true ){
          let id; 
          if(sessions.datas.length != 0){
            id = sessions.datas[sessions.datas.length-1].id+1;
          }else{
            id = 1;
          }
          const created_at = new Date().toDateString(); 
          const data = new Session.DataSession(req.body,id,user,mentor,created_at);
  
          sessions.save(data).then(session =>{
            res.status(201).json({
              status : 201,
              message : 'Session created succuefully',
              data : {
                id : session.id,
                mentorName : mentor.firstname,
                mentorEmail : mentor.email,
                menteeName : user.firstname,
                menteeEmail : session.menteeEmail,
                questions : session.questions,
                status : session.status,
                created_at : session.created_at 
              }
            });
          });
        }else{
          res.status(404).json({
            status: 404,
            error: 'Mentor not found'
          });
        }
      }); 
    }else{
      res.status(422).send({status: 422, error: validate.error});
    }   
  },
  acceptSession : (req, res) => {
    const id = parseInt(req.params.sessionId);
    sessions.find(id).then(session =>{
      if(session){
        session.status = 'accepted'; 
        res.status(200).json({
          status : 200,
          message : 'session accepted succuefully',
          data : {
            id: session.id,
            mentorName: session.mentorName,
            mentorEmail: session.mentorEmail, 
            menteeName: session.menteeName,
            menteeEmail : session.menteeEmail,
            questions : session.questions,
            status : session.status,
            created_at : session.created_at
          }
        });
      }else{
        res.status(404).json({
          status : 404,
          error : 'Session mentorship not found'
        });
      }
    }); 
  },
  rejectSession : (req, res) => {
    const id = parseInt(req.params.sessionId);
    sessions.find(id).then(session =>{
      if(session){
        session.status = 'rejected'; 
        res.status(200).json({
          status : 200,
          message : 'session rejected succuefully',
          data : {
            id: session.id,
            mentorName: session.mentorName,
            mentorEmail: session.mentorEmail, 
            menteeName: session.menteeName,
            menteeEmail : session.menteeEmail,
            questions : session.questions,
            status : session.status,
            created_at : session.created_at
          }
        });
      }else{
        res.status(404).json({
          status : 404,
          error : 'Session mentorship not found'
        });
      }
    }); 
  },
  getSession : (req, res) => {
    const user = helper.authUser(req.headers.authorization);
    users.find(user.userId).then(user =>{
      if(user){
        if(user.is_mentor){
          sessions.findForMentor(user.id).then(sessions =>{
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
                message : 'all sessions',
                data : sessionArray
              });
            }else{
              res.status(404).json({
                status : 404,
                error : 'No session found from now'
              });  
            }
          });
        }else{
          sessions.findForMentee(user.id).then(sessions =>{
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
                message : 'all sessions',
                data : sessionArray
              });
            }else{
              res.status(404).json({
                status : 404,
                error : 'No session found from now'
              });   
            }
          });
        }
      }else{
        res.status(404).json({
          status : 404,
          error : 'user not found'
        }); 
      }
    });
  }
}

export default sessionController;