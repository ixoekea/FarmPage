import dotenv from "dotenv";
dotenv.config();

import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import nodemailer from "nodemailer";

const app = express();
const PORT = process.env.PORT || 3000;

// CORS for frontend access
app.use(cors());

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "./uploads";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Handle form submissions with email
app.post("/submit", upload.single("logo"), async (req, res) => {
  const { farmName, email, phone, location, website, product } = req.body;
  const logoFile = req.file;

  const farmData = {
    name: farmName,
    email,
    phone,
    location,
    website,
    product,
    logoFilename: logoFile?.filename || "No file uploaded",
  };

  console.log("📩 New farm signup:", farmData);

  // Email setup
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"FarmPage" <${process.env.EMAIL_USER}>`,
    to: "your-email@example.com", // <--- Replace with YOUR email
    subject: "New Farm Signup",
    text: `
New farm signup submitted:

Name: ${farmData.name}
Email: ${farmData.email}
Phone: ${farmData.phone}
Location: ${farmData.location}
Website: ${farmData.website}
Product: ${farmData.product || "N/A"}
Logo File: ${farmData.logoFilename}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Form submitted and email sent!" });
  } catch (err) {
    console.error("Email sending failed:", err);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
