import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool;
const { NODE_ENV, DATABASE_URL, DB_USERNAME, DB_HOST, DB_DATABASE,DB_PASSWORD, DB_PORT } = process.env;
if(NODE_ENV === 'production'){
  const connectionString = DATABASE_URL;
  pool = new Pool({ connectionString });
}else{
  pool = new Pool({ 
    user: DB_USERNAME,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: DB_PORT
  });
}


export default pool;
