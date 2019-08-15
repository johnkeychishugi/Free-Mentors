const todo = {
  "notice" : "this is the V1 api of free mentors",
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
    "auth/login" : "login a registered user",
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

export default { todo }