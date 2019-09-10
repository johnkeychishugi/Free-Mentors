import Joi from '@hapi/joi';
import helper from '../helpers/general';

export default class Validator {
  static schemaSignUp(user) {
    const userSchema ={
      firstname: Joi.string().required().label('Fistname is required'),
      lastname: Joi.string().required().label('Lastname is required'),
      email : Joi.string().email().required().label('Email Address is invalid'),
      password : Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).min(8).required().label('Password must contains at least 1 uppercase letter, 1 lowercase letter, and 1 special character  and the minimale is 8 characters'),
      confirmPassword : Joi.string().valid(Joi.ref('password')).required().strict().label('confirm Password must match with password')
    }
    const response = Joi.validate(user,userSchema);
    if(response.error)
    {
      return helper.responseValidator(response.error.details);
    }else{
      return '';
    }
  }
  static schemaSignIn(user){
    const userSchema ={
      email: Joi.string().email().required().label('Email address is required and must valid'),
      password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().label('Password must contains at least 1 uppercase letter, 1 lowercase letter, and 1 special character  and the minimale is 8 characters')
    }
    const response = Joi.validate(user,userSchema);
    if(response.error)
    {
      return helper.responseValidator(response.error.details);
    }else{
      return '';
    }
  }
  static schemaSession(session){
    const sessionSchema ={
      mentorId: Joi.number().required().label('MentorId must be a number'),
      questions: Joi.string().required().label('Question is required')
    }
    const response = Joi.validate(session,sessionSchema);
    if(response.error)
    {
      return helper.responseValidator(response.error.details);
    }else{
      return '';
    }
  }
  static schemaChangePassword(user){
    const changepasswordSchema ={
      old_password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).min(8).required().label('Password must contains at least 1 uppercase letter, 1 lowercase letter, and 1 special character  and the minimale is 8 characters'),
      new_password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).min(8).required().label('Password must contains at least 1 uppercase letter, 1 lowercase letter, and 1 special character  and the minimale is 8 characters'),
      confirm_new_password : Joi.string().valid(Joi.ref('new_password')).required().strict().label('confirm Password must match with password')
    }
    const response = Joi.validate(user,changepasswordSchema);
    if(response.error)
    {
      return helper.responseValidator(response.error.details);
    }else{
      return '';
    }
   
  }
  static schemaUpdateProfile(userInfo) {
    const infosSchema ={
      address: Joi.string().required().label('Address is required'),
      bio: Joi.string().required().label('Bio is required'),
      occupation: Joi.string().required().label('Occupation is required'),
      expertise: Joi.string().required().label('Expertise is required')  
    }
    const response = Joi.validate(userInfo, infosSchema);
    if(response.error)
    {
      return helper.responseValidator(response.error.details);
    }else{
      return '';
    }
  }
  static schemaReview(review){
    const reviewSchema ={
      score: Joi.number().min(1).max(5).required().label('Score must be a number, min 1 and max 5'),
      remark: Joi.string().required().label('Remark is required')
    }
    const response = Joi.validate(review,reviewSchema);
    if(response.error)
    {
      return helper.responseValidator(response.error.details);
    }else{
      return '';
    }
  }
}