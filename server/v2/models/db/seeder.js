import pool from '../../config/db.config';
import helper from '../../helpers/general';

const password = helper.hashPassword('Chi@123456');


const user1 = `INSERT INTO users(
                   email,
                   firstname,
                   lastname,
                   address,
                   bio,
                   occupation,
                   expertise,
                   is_admin,
                   password
                   ) 
               VALUES(
                   'jkchishugi@gmail.com', 
                   'John', 
                   'Chishugi', 
                   'Gisozi Kigali',
                   'am programmer', 
                   'software developer',
                   'Build rodust app',
                   ${true},
                   '${password}'
                  );`;

const user2 = `INSERT INTO users(
                   email,
                   firstname,
                   lastname,
                   address,
                   bio,
                   occupation,
                   expertise,
                   is_admin,
                   password
                   ) 
               VALUES(
                   'ericebulu@gmail.com', 
                   'Eric', 
                   'Ebulu', 
                   'Kigali Koko',
                   'software developer', 
                   'Project manager',
                   'Rodust app',
                   ${false},
                   '${password}'
                  );`;  

const user3 = `INSERT INTO users(
                   email,
                   firstname,
                   lastname,
                   address,
                   bio,
                   occupation,
                   expertise,
                   is_admin,
                   password
                   ) 
               VALUES(
                   'moise@gmail.com', 
                   'Moise', 
                   'Ngalume', 
                   'Rwanda Gisengi',
                   'software developer', 
                   'Project manager',
                   'Busness',
                   ${false},
                   '${password}'
                  );`;                    

                                  
const queryString = `
${user1}
${user2}
${user3}

`;

(async () => {
  try {
    await pool.query(queryString);
  } 
  catch (error) {
    console.log(error);
  }
})();
