import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In production, rely on the host's environment variables so local defaults
// like localhost database settings do not leak into the deployment.
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.join(__dirname, "config.env") });
}

