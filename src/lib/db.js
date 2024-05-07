import { Client, Pool } from 'pg';
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "ratat.art",
    password: "fallenlearndb",
    port: 5432,
})
export const connectToDB = async () => await pool.connect();