import type { Config } from "drizzle-kit";
export default {
  schema: "./src/db/schema/*",
  out: "./src/db/drizzle",
  driver: 'mysql2',
  dbCredentials: {
    connectionString: `mysql://127.0.0.1:3306/next_app?user=root&password="123456"`,
  },
  verbose: true,
  strict: true,
  breakpoints: true
} as Config