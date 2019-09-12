# Free-Mentors

[![Build Status](https://travis-ci.com/johnkeychishugi/Free-Mentors.svg?branch=develop)](https://travis-ci.com/johnkeychishugi/Free-Mentors)
[![Coverage Status](https://coveralls.io/repos/github/johnkeychishugi/Free-Mentors/badge.svg?branch=develop)](https://coveralls.io/github/johnkeychishugi/Free-Mentors?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/1cebb4cfa2c5500ce494/maintainability)](https://codeclimate.com/github/johnkeychishugi/Free-Mentors/maintainability)

## Platform Description

Free-Mentors is a relationship in which a more experienced or more knowledgeable person helps to guide a less experienced or less knowledgeable person.

## Features

- Users view the welcome page that expressively describes the platform.
- Users can sign up.
- Users can sign in.
- Users can change password.
- Admins can change user to mentor.
- Admins can remove a mentor.
- Admin can view all other admins.
- Users can view all mentors.
- Users can view a specific mentor.
- Users can create a mentorship session request.
- Mentor can accept a mentorship session request.
- Mentor can reject a mentorship session request.
- Mentor can view all mentorship sessions request created against him.
- Mentee can view all mentorship sessions request created by him.
- Mentor can create a review after a mentorship session.
- Mentee can view mentorship review.
- Admin can view all mentorship reviews.
- Admin can delete a mentorship review deemed inappropriate.

 ### For user interface

- visit this link [Free Mentors (Users side)](https://johnkeychishugi.github.io/Free-Mentors/UI)
- visit this link [Free Mentors (Admin side)](https://johnkeychishugi.github.io/Free-Mentors/UI/admin)

### Get start now

- `git clone https://github.com/johnkeychishugi/Free-Mentors`
- `npm install`
- `npm run start-dev`

## API Endpoints Specifications

- ApiRoot = https://free-mentors-app.herokuapp.com/.
- Notice  : this is the V1 api so make sure to put /api/v1/ before any route. eg: https://free-mentors-app.herokuapp.com/api/v1/api-docs.

| Endpoint | Request | Status | Description |
| --- | --- | --- | --- |
| / | GET | 200 OK | Helps users to access to the root of the api |
| /auth/signup | POST | 201 OK | Makes a post request to register a new user,return token |
| /auth/signin | POST | 200 OK | Sign in the user already having a user account, return token |
| /auth/changepassword | PATCH | 200 OK | For the user to change the password  |
| /user/:userId | PATCH | 200 OK | For the admin to change user to mentor |
| /mentor/:userId | PATCH | 200 OK | For admin to remove a mentor |
| /mentors | GET | 200 OK | For the admin and users to view all mentors |
| /mentors/:mentorId | GET | 200 OK | For the the users to view a specific mentor |
| /admins | GET | 200 OK | For admin to view all other admins |
| /sessions | POST | 201 OK | For users to create a mentorship session request |
| /sessions/:sessionId/accept | PATCH | 200 OK | For mentors to accept a mentorship session request |
| /sessions/:sessionId/reject | PATCH | 200 OK | For mentors to reject a mentorship session request |
| /sessions | GET | 200 OK | For mentors and mentees to view  mentorship session request |
| /sessions/:sessionId/review | POST | 201 OK | For mentors to create a review after a mentorship session|
| /reviews/:reviewId | GET | 200 OK | For menteens to view a specific mentorship review |
| /sessions/:sessionId/review | DELETE | 200 OK | For admin to delete a specific mentorship review |

## Tools

Tools used for development of this API are;
- Documentation : [Swagger](https://swagger.io/).
- Framework: [ExpressJS](http://expressjs.com/).
- Code Editor/IDE: [VSCode](https://code.visualstudio.com), [Sublime Text](https://www.sublimetext.com/).
- Programming language: [JavaScript(ES6)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/).
- API Testing environment: [Postman](https://www.getpostman.com).

## Getting Started

1. Clone the github repository [here](https://github.com/johnkeychishugi/Free-Mentors). 
2. Kindly read very well the provided documentation

## Deployment

- Github Pages : https://johnkeychishugi.github.io/Free-Mentors/UI.
- Heroku Deployment : https://free-mentors-app.herokuapp.com/.

## Api Documentation

Get started with Free Mentor Api endpoints documentation [here](https://free-mentors-app.herokuapp.com/api/v1/api-docs).

## Key Contributor

- John Chishugi

## Acknowledgements

- Andela Homestudy : https://homestudy.andela.com

# License

MIT
