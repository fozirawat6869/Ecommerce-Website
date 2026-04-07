

// import mysql2 from 'mysql2';
// import dotenv from 'dotenv';

// dotenv.config({ path: './config/config.env' });

// const connection = mysql2.createConnection({
//     host: process.env.HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DATABASE,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     ssl: {
//         rejectUnauthorized: false  // ← required for Railway MySQL
//     }
// });

// connection.connect((err) => {
//     if (err) {
//         console.log("❌ MySQL Connection Failed!");
//         console.log(err);
//         return;
//     }
//     console.log(`✅ MySQL Connected on port ${process.env.DB_PORT}`);
// });

// export default connection;


import mysql2 from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({
    path: './config/config.env'
});

const connection = mysql2.createConnection({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  ssl: { rejectUnauthorized: false }  // Required for Railway
});

connection.connect(err => {
  if (err) {
    console.log("❌ MySQL Connection Failed!", err);
  } else {
    console.log(`✅ MySQL Connected on port ${process.env.DB_PORT}`);
  }
});

export default connection;
