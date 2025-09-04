import pg from "pg";
import dotenv from "dotenv";

//config env --> activating the .env file
dotenv.config();

//connection string creates a channel between this server and my database in Supabase
const dbConnectionString = process.env.DATABASE_URL;

//create a pool for our requests
export const db = new pg.Pool({
  connectionString: dbConnectionString,
});
