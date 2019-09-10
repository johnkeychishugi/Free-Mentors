import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const authUser = (header) =>{
  const token = header.split(' ')[1];
  const decoded = jwt.verify(token, process.env.TOKEN_KEY);
  return decoded;
}
const responseValidator = (data) =>{
  let message;
  data.forEach(error => {
    message = error.context.label;
  });
  return message;
}
const hashPassword = password => bcrypt.hashSync(password, 10);

export default { authUser, hashPassword, responseValidator }