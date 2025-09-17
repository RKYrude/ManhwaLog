// import pg from "pg"
// import dotenv from "dotenv"

// dotenv.config();

// const db = new pg.Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false,
//     },
// });

// db.connect()
//     .then(() => {
//         console.log("Connected to Supabase Hosted Database successfully");
//     })
//     .catch((err) => {
//         console.error("Database Connection error", err.stack);
//     });


// export default db;



import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.on("connect", () => {
  console.log("Connected to Supabase Hosted Database via Pooler successfully");
});

pool.on("error", (err) => {
  console.error("Unexpected database error", err);
});

export default pool;
