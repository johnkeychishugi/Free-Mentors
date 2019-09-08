import Joi from '@hapi/joi';

export default class Validator {
  static schemaSignUp(user) {
    const userSchema ={
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email : Joi.string().email().required(),
      password : Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).min(8).required(),
      confirmPassword : Joi.string().valid(Joi.ref('password')).required().strict()
    }
    return Joi.validate(user, userSchema);
  }
  static schemaSignIn(user){
    const userSchema ={
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required()
    }
    return Joi.validate(user,userSchema);
  }
  static schemaSession(session){
    const sessionSchema ={
      mentorId: Joi.number().required(),
      questions: Joi.string().required()
    }
    return Joi.validate(session,sessionSchema);
  }
  static schemaChangePassword(user){
    const changepasswordSchema ={
      old_password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).min(8).required(),
      new_password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).min(8).required(),
      confirm_new_password : Joi.string().valid(Joi.ref('new_password')).required().strict()
    }
    return Joi.validate(user,changepasswordSchema);
  }
  static schemaUpdateProfile(userInfo) {
    const infosSchema ={
      address: Joi.string().required(),
      bio: Joi.string().required(),
      occupation: Joi.string().required(),
      expertise: Joi.string().required()  
    }
    return Joi.validate(userInfo, infosSchema);
  }
  static schemaReview(review){
    const reviewSchema ={
      score: Joi.number().min(1).max(5).required(),
      remark: Joi.string().required()
    }
    return Joi.validate(review,reviewSchema);
  }
}