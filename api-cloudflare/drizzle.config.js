export default {
  schema: "./src/db/schema.js",
  out: "./drizzle",
  driver: "d1",
  dbCredentials: {
    wranglerConfigPath: "wrangler.toml",
    dbName: "clinic-booking-db"
  }
};
