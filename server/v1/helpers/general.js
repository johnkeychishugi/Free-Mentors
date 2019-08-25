import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authUser = (header) =>{
  const token = header.split(' ')[1];
  const decoded = jwt.verify(token, process.env.TOKEN_KEY);
  return decoded;
}

export default { authUser }