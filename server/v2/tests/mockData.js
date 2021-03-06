const mockData = {
  signup : [
    {
      firstname : 'Ary',
      lastname : 'kakule',
      email : 'kakule@gmail.com',
      password : 'Chi@123456',
      confirmPassword : 'Chi@123456'
    },
    {
      firstname : 'John key',
      lastname : 'iragi',
      email : 'iragi@gmail.com',
      password : 'Ch@123456',
      confirmPassword : 'Ch@123456',
    },
    {
      firstname : 'Bienvenue',
      lastname : 'zigabe',
      email : 'bienvenue1@gmail.com',
      password : 'Ch@11223344',
      confirmPassword : 'Ch@11223344',
    }
  ],
  signin : [
    {
      email: 'jkchishugi@gmail.com',
      password : 'Chi@123456' 
    },
    {
      email: 'jkchishugi@popmooder.com',
      password : '87Ch@654321'
    },
    {
      email: 'kakule@gmail.com',
      password : 'Ch@654321'
    },
    {
      email: 'bienvenue1@gmail.com',
      password : 'Ch@11223344'
    },
    {
      email: 'ericebulu@gmail.com',
      password : 'Chi@123456'
    },
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
      mentorId: 2,
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
export default mockData;
