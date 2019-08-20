import Session from '../models/session';
import User from '../models/user';
import Review from '../models/review';
import Validator from '../middlewares/validators';

const sessions = Session.sessions;
const users =  User.Users;
const reviews = Review.reviews;

const reviewController = {
  review : (req, res) =>{
    req.body.score = parseInt(req.body.score);
    const validate = Validator.schemaReview(req.body);
    if(!validate.error){
      sessions.find(parseInt(req.params.sessionId)).then(session =>{
        if(session){
          users.find(session.menteeId).then(user =>{
            if(user){
              let id; 
              if(reviews.datas.length != 0){
                id = reviews.datas[reviews.datas.length-1].id+1;
              }else{
                id = 1;
              }
              const created_at = new Date(); 
              const menteeFullName = user.firstname + ' ' + user.lastname;
              const data = new Review.DataReview(session,req.body,id,menteeFullName,created_at);

              reviews.save(data).then(review =>{
                res.status(200).json({
                  status : 200,
                  data : review
                });
              });
            }else{
              res.status(404).json({
                status : 404,
                error : 'Mentee not found'
              }); 
            }
          });
        }else{
          res.status(404).json({
            status : 404,
            error : 'Session mentorship not found'
          });
        }
      })
   
    }else{
      res.status(422).send({status: 422, error: validate.error});
    }
  }
}
export default reviewController;