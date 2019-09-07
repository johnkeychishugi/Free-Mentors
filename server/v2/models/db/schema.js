import pool from '../../config/db.config';

const usersTable = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(254) NOT NULL,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    address VARCHAR(100) DEFAULT NULL,
    bio TEXT DEFAULT NULL,
    occupation VARCHAR(250) DEFAULT NULL,
    expertise VARCHAR(250) DEFAULT NULL,
    is_admin BOOLEAN DEFAULT false,
    is_mentor BOOLEAN DEFAULT false,
    password VARCHAR(255) NOT NULL,
    created_at DATE DEFAULT NOW()
);
`;

const sessionsTable = `
DROP TABLE IF EXISTS sessions CASCADE;
CREATE TABLE sessions (
    id SERIAL PRIMARY KEY,
    mentorId INTEGER NOT NULL,
    menteeId INTEGER NOT NULL,
    questions TEXT NOT NULL,
    menteeEmail VARCHAR(254) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at DATE DEFAULT NOW()
);
`;

const reviewsTable = `
DROP TABLE IF EXISTS reviews CASCADE;
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    sessionId INTEGER NOT NULL,
    mentorId INTEGER NOT NULL,
    menteeId INTEGER NOT NULL,
    score INTEGER NOT NULL,
    menteeFullName VARCHAR(100) NOT NULL,
    remark VARCHAR(100) NOT NULL,
    created_at DATE DEFAULT NOW()
);
`;


const queryString =
 `
  ${usersTable}
  ${sessionsTable}
  ${reviewsTable}

`;

(async () => {
  try {
    await pool.query(queryString);
  } catch (error) {
    if (error) console.log(error);
  }
})();
