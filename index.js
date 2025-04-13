import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";

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

// Handle form submissions
app.post("/submit", upload.single("logo"), (req, res) => {
  const { farmName, email, phone, location, website, product } = req.body;
  const logoFile = req.file;

  const farmData = {
    name: farmName,
    email,
    phone,
    location,
    website,
    product,
    logoFilename: logoFile?.filename || null,
  };

  console.log("📩 New farm signup:", farmData);

  res.json({ success: true, message: "Form submitted successfully!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
