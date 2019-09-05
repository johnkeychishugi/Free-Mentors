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
          reviews.findBysessionId(parseInt(req.params.sessionId)).then(data =>{
            if(!data){
              users.find(session.menteeId).then(user =>{
                if(user){
                  let id; 
                  if(reviews.datas.length != 0){
                    id = reviews.datas[reviews.datas.length-1].id+1;
                  }else{
                    id = 1;
                  }
                  const created_at = new Date().toDateString(); 
                  const menteeFullName = user.firstname + ' ' + user.lastname;
                  const data = new Review.DataReview(session,req.body,id,menteeFullName,created_at);
    
                  reviews.save(data).then(review =>{
                    res.status(201).json({
                      status : 201,
                      message : 'review accepted succuefully',
                      data : {
                        id : review.id,
                        sessionId : review.sessionId,
                        mentorName : review.mentorName,
                        menteeName : review.menteeFullName,
                        score: review.score,
                        remark : review.remark,
                        created_at : review.created_at
                      }
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
              res.status(409).json({
                status : 409,
                error : 'Review already exist'
              });
            }
          })
        }else{
          res.status(404).json({
            status : 404,
            error : 'Session mentorship not found'
          });
        }
      });
    }else{
      res.status(422).send({status: 422, error: validate.error});
    }
  },
  Deletereview : (req ,res) =>{
    reviews.delete(parseInt(req.params.sessionId)).then(reviews =>{
      if(reviews){
        res.status(200).json({
          status : 200,
          message : 'Review successfully deleted' 
        });
      }else{
        res.status(404).json({
          status : 404,
          error : 'Review not found'
        });
      }
    })
  },
  showReview : (req, res) =>{
    reviews.find(parseInt(req.params.reviewId)).then(review =>{
      if(review){
        res.status(200).json({
          status : 200,
          message : 'Get a review',
          data : {
            id : review.id,
            sessionId : review.sessionId,
            mentorName : review.mentorName,
            menteeName : review.menteeFullName,
            score: review.score,
            remark : review.remark,
            created_at : review.created_at
          } 
        });
      }else{
        res.status(404).json({
          status : 404,
          error: 'Review not found'
        });
      }
    })
  }
}
export default reviewController;