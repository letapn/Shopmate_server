import pkg from "pg";

const { Pool } = pkg;

const useConnectionString = Boolean(process.env.DATABASE_URL);
const isProduction = process.env.NODE_ENV === "production";

const databaseConfig = useConnectionString
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: isProduction ? { rejectUnauthorized: false } : false,
    }
  : {
      host: process.env.DB_HOST || "127.0.0.1",
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      database: process.env.DB_NAME,
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "Aman",
      ssl: isProduction ? { rejectUnauthorized: false } : false,
    };

const database = new Pool(databaseConfig);

try {
  await database.query("SELECT 1");
  console.log("Connected to the database successfully");
} catch (error) {
  console.error("database connection failed", error);
  process.exit(1);
}

export default database;
