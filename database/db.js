import pkg from "pg";

const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL?.trim();
const useConnectionString =
  Boolean(connectionString) &&
  /^postgres(?:ql)?:\/\//i.test(connectionString);
const isProduction = process.env.NODE_ENV === "production";

const databaseConfig = useConnectionString
  ? {
      connectionString,
      ssl: isProduction ? { rejectUnauthorized: false } : false,
    }
  : {
      host: process.env.PGHOST || process.env.DB_HOST || "127.0.0.1",
      port: process.env.PGPORT ? Number(process.env.PGPORT) : process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      database: process.env.PGDATABASE || process.env.DB_NAME,
      user: process.env.PGUSER || process.env.DB_USER || "postgres",
      password: process.env.PGPASSWORD || process.env.DB_PASSWORD || "Aman",
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
