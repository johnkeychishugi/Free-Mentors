import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const todo = {
  "notice" : "This is the V1 API so make sure to put /api/v1/ before any route. eg: api/v1/auth/signin",
  "GET/" : {
    "mentors" : "all mentors",
    "mentor/:id" : "get specific mentor",
    "session/:id" : "get all sessions for a specific user",
    "review/:id" : "get a specific review of a session",
    "users" : "get all users",
    "sessions" : "get all sessions",

  },

  "POST/" : {
    "auth/signup" : "register a new user",
    "auth/signin" : "login a registered user",
    "request-session/:id" : "send a mentorship requsest to a mentor",
  },
  "DELETE/" : {
    "session/:id" : "Delete a specific session "
  },
  "PUT/" : {
    "edit-profile/:id" : "Edit the information of specific users",
    "decline/:id" : "Decline a request session",
    "accept/:id" : "Accept a request session",

  }
}
const authUser = (header) =>{
  const token = header.split(" ")[1];
  const decoded = jwt.verify(token, process.env.TOKEN_KEY);
  return decoded;
}

export default { todo, authUser }