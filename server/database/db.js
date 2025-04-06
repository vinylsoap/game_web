import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' });

const { Pool } = pkg;

// Pool connection
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  port: process.env.DB_PORT || 5432,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "game_web"
});

pool.connect()
.then(() => console.log('Connected!'))
.catch(err => console.log('Fucked', err));


export default pool;
