//   const expireTime = new Date(Date.now() + 2 * 60 * 1000);
  const expireTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

console.log(expireTime)

import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import { db } from "./db.js";

dotenv.config();
const app = express();
app.use(express.json());

// -------------------------
// 1) SEND OTP
// -------------------------
app.post("/send-otp", async (req, res) => {
  const { phone } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000); // 6 digit OTP
  const expireTime = new Date(Date.now() + 2 * 60 * 1000); // 2 min

  await db.query(
    "REPLACE INTO users (phone, otp, otp_expire) VALUES (?, ?, ?)",
    [phone, otp, expireTime]
  );

  // Send OTP via MSG91 (VERY SIMPLE)
  await axios.get(
    `https://api.msg91.com/api/sendhttp.php?mobiles=${phone}&authkey=${process.env.MSG91_AUTHKEY}&route=4&sender=${process.env.MSG91_SENDER_ID}&message=Your OTP is ${otp}`
  );

  res.json({ success: true, message: "OTP sent!" });
});

// --------------------------
// 2) VERIFY OTP
// --------------------------
app.post("/verify-otp", async (req, res) => {
  const { phone, otp } = req.body;

  const [rows] = await db.query("SELECT * FROM users WHERE phone=?", [phone]);
  const user = rows[0];

  if (!user) return res.json({ success: false, message: "User not found" });

  if (user.otp !== otp) {
    return res.json({ success: false, message: "Wrong OTP" });
  }

  if (new Date() > new Date(user.otp_expire)) {
    return res.json({ success: false, message: "OTP expired" });
  }

  // SUCCESS → LOGIN/REGISTER USER
  res.json({ success: true, message: "OTP verified. User logged in." });
});

// --------------------------
app.listen(8000, () => console.log("Server running on 8000"));







const express = require("express");
const mysql = require("mysql2/promise");
const multer = require("multer");

const app = express();
app.use(express.json());

// Multer setup for images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// MySQL connection
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "your_db"
});

// Route to add product
app.post("/add-product", upload.array("images"), async (req, res) => {
  try {
    // Separate main fields
    const { name, description, price, quantity, category, ...attributes } = req.body;

    // attributes now contains everything else: {brand: "Samsung", type: "QLED"}
    const attributesJSON = JSON.stringify(attributes);

    // 1️⃣ Insert product
    const [result] = await db.query(
      `INSERT INTO products (name, description, price, quantity, category_id, attributes)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, description, price, quantity, category, attributesJSON]
    );
    const productId = result.insertId;

    // 2️⃣ Insert images
    if (req.files && req.files.length > 0) {
      const imgValues = req.files.map(file => [productId, file.path.replace(/\\/g, "/")]);
      await db.query(
        `INSERT INTO product_images (product_id, filename) VALUES ?`,
        [imgValues]
      );
    }

    res.json({ message: "Product added successfully", productId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding product" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));