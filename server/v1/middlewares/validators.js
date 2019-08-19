import Joi from 'joi';

export default class Validator {
  static schemaSignUp(user) {
    const userSchema ={
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email : Joi.string().email().required(),
      address: Joi.string().required(),
      bio: Joi.string().required(),
      occupation: Joi.string().required(),
      expertise: Joi.string().required(),
      password : Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).required(),
      confirmPassword : Joi.string().valid(Joi.ref('password')).required().strict(),
      is_admin: Joi.boolean()
    }
    return Joi.validate(user, userSchema);
  }
  static schemaSignIn(user){
    const userSchema ={
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).required()
    }
    return Joi.validate(user,userSchema);
  }
}