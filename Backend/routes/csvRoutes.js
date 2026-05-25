const express = require("express");
const router = express.Router();

const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");

const db = require("../config/db");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/upload",
  upload.single("file"),
  (req, res) => {

    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })

      .on("end", () => {

        results.forEach((row) => {

          db.query(
            "INSERT INTO sentiments(message, sentiment) VALUES (?, ?)",
            [row.message, row.sentiment]
          );
        });

        res.json({
          message: "CSV Uploaded Successfully",
        });
      });
  }
);

module.exports = router;