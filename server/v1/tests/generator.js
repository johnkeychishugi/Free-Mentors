
const generator = {
  signup : [
    {
      firstname : 'Aristotle',
      lastname : 'Kalume',
      email : 'kalume@gmail.com',
      password : 'Chi@123456',
      confirmPassword : 'Chi@123456'
    },
    {
      firstname : 'John',
      lastname : 'Chishugi',
      email : 'jkchishugi@gmail.com',
      password : 'Ch@123456',
      confirmPassword : 'Ch@123456',
    },
    {
      firstname : 'Bienvenue',
      lastname : 'zigabe',
      email : 'bienvenue@gmail.com',
      password : 'Ch@11223344',
      confirmPassword : 'Ch@11223344',
    }
  ],
  signin : [
    {
      email: 'jkchishugi@gmail.com',
      password : 'Ch@123456' 
    },
    {
      email: 'jkchishugi@popmooder.com',
      password : '87Ch@654321'
    },
    {
      email: 'kalume@gmail.com',
      password : 'Ch@654321'
    },
    {
      email: 'bienvenue@gmail.com',
      password : 'Ch@11223344'
    }
  ],
  changepass : [
    {
      old_password: 'Chi@123456',
      new_password : 'Ch@654321',
      confirm_new_password : 'Ch@654321'
    },
    {
      old_password: 'Ch@1234567',
      new_password : 'Ch@654321',
      confirm_new_password : 'Ch@654321'
    },
    {
      old_password: 'Ch@123456',
      new_password : 'Ch@654321',
      confirm_new_password : 'Ch@6543217'
    }
  ],
  updateProfile :[
    {
      occupation: 'Software Develop',
      expertise : 'Project manager',
      bio : 'Born to win',
      'address' :'Goma'
    },
    {
      occupation: 'Software Develop',
      expertise : 'Project manager',
      bio : 'Born to win',
      'address' :'Goma'
    }
  ],
  session : [
    {
      mentorId: 3,
      questions : 'What is your best skills sir'
    },
    {
      mentorId: 1,
      questions : 'What is your best skills sir'
    }
  ],
  review : [
    {
      score: 3,
      remark : 'Good job,but continous to learn by youself'
    },
    {
      score: 0,
      remark : 'Good job,but continous to learn by youself'
    },
    {
      score: 6,
      remark : 'Good job,but continous to learn by youself'
    }
  ]
}

export default generator;