import Session from '../models/session';
import User from '../models/user';
import helper  from '../helpers/general';

const sessions = Session.sessions;
const users =  User.Users;


const sessionController = {
  createSession : (req, res) => {
    const user = helper.authUser(req.headers.authorization);
    users.find(parseInt(req.body.mentorId)).then(mentor =>{
      if(mentor && mentor.is_mentor === true ){
        let id; 
        if(sessions.datas.length != 0){
          id = sessions.datas[sessions.datas.length-1].id+1;
        }else{
          id = 1;
        }
        const created_at = new Date(); 
        const data = new Session.DataSession(req.body,id,user,created_at);

        sessions.save(data).then(session =>{
          res.status(200).json({
            status : 200,
            data : session
          });
        });
      }else{
        res.status(404).json({
          status: 404,
          error: 'Mentor not found'
        });
      }
    });    
  },
  acceptSession : (req, res) => {
    const id = parseInt(req.params.sessionId);
    sessions.find(id).then(session =>{
      if(session){
        session.status = 'accepted'; 
        res.status(200).json({
          status : 200,
          data : session
        });
      }else{
        res.status(404).json({
          status : 404,
          error : 'Session mentorship not found'
        });
      }
    }); 
  }
}

export default sessionController;