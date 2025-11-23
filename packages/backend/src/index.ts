import { db, client } from "./database";
import { sql } from "drizzle-orm";

async function main() {
  try {
    console.log("Connecting to database...");

    // Test database connection with a simple query
    const result = await db.execute(
      sql`SELECT NOW() as current_time, version() as pg_version`
    );

    console.log("✅ Database connection successful!");
    console.log("Current time:", result[0].current_time);
    console.log("PostgreSQL version:", result[0].pg_version);

    // Close the connection
    await client.end();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}

main();
