import pkg from "pg";

const { Pool } = pkg;

const connectionString =
  process.env.DATABASE_URL?.trim() ||
  process.env.POSTGRES_URL?.trim() ||
  process.env.POSTGRES_URI?.trim();
const useConnectionString =
  Boolean(connectionString) &&
  /^postgres(?:ql)?:\/\//i.test(connectionString);
const isProduction = process.env.NODE_ENV === "production";
const host = process.env.PGHOST || process.env.DB_HOST;
const databaseName = process.env.PGDATABASE || process.env.DB_NAME;

if (!useConnectionString && (!host || !databaseName)) {
  throw new Error(
    "Missing PostgreSQL configuration. Set DATABASE_URL (preferred) or both DB_HOST and DB_NAME (plus DB_USER/DB_PASSWORD/DB_PORT if needed)."
  );
}

const databaseConfig = useConnectionString
  ? {
      connectionString,
      ssl: isProduction ? { rejectUnauthorized: false } : false,
    }
  : {
      host: host || (process.env.NODE_ENV === "development" ? "127.0.0.1" : undefined),
      port: process.env.PGPORT
        ? Number(process.env.PGPORT)
        : process.env.DB_PORT
          ? Number(process.env.DB_PORT)
          : 5432,
      database: databaseName,
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
