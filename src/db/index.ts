import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as usersSchema from './schema/users';
import * as postsSchema from './schema/posts';
const DB_URL = process.env.DB_URL;
if (!DB_URL) process.exit();
const connection = await mysql.createConnection(DB_URL);

const db = drizzle(connection, { schema: { ...usersSchema, ...postsSchema }, mode: 'default' });

export default db