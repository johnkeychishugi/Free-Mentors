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
      email: 'iragi@gmail.com',
      password : 'Ch@123456' 
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
  ]
}
export default mockData;
