import Session from '../models/session';
import User from '../models/user';
import Review from '../models/review';
import Validator from '../middlewares/validators';

const sessions = Session.sessions;
const users =  User.Users;
const reviews = Review.reviews;

const reviewController = {
  review : async (req, res) =>{
    req.body.score = parseInt(req.body.score);
    const validate = Validator.schemaReview(req.body);
    if(!validate.error){
      let [session] = await sessions.find(parseInt(req.params.sessionId))
      if(session){
        let [data] = await reviews.findBysessionId(parseInt(req.params.sessionId));
        if(!data){
          let [user] = await users.find(session.menteeid)
          if(user){
            const data = new Review.DataReview(session,req.body);
    
            let [review] = await reviews.save(data);
            res.status(201).json({
              status : 201,
              message : 'review accepted succuefully',
              data : review
            });

          }else{
            res.status(404).json({
              status : 404,
              error : 'Mentee not found'
            }); 
          }
        }else{
          res.status(409).json({
            status : 409,
            error : 'Review already exist'
          });
        }
      }else{
        res.status(404).json({
          status : 404,
          error : 'Session mentorship not found'
        });
      }
    }else{
      res.status(422).send({status: 422, error: validate.error});
    }
  },
  showReview : async (req, res) =>{
    let [review] = await reviews.find(parseInt(req.params.reviewId));
    if(review){
      res.status(200).json({
        status : 200,
        message : 'Review is retrieved successfully',
        data : review
      });
    }else{
      res.status(404).json({
        status : 404,
        error: 'Review not found'
      });
    }
  },
  Deletereview : async (req ,res) =>{
    let [response] = await reviews.delete(parseInt(req.params.sessionId));
    if(response){
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
  }
}
export default reviewController;