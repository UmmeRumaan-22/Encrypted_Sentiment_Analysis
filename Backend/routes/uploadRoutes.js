const express = require("express");

const router = express.Router();

const multer = require("multer");

const fs = require("fs");

const csv = require("csv-parser");

const db = require("../config/db");

// ===============================
// MULTER STORAGE
// ===============================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {

    cb(null, Date.now() + "-" + file.originalname);
  },

});

const upload = multer({
  storage,
});

// ===============================
// CSV UPLOAD ROUTE
// ===============================

router.post(

  "/csv",

  upload.single("file"),

  (req, res) => {

    // CHECK FILE

    if (!req.file) {

      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const results = [];

    fs.createReadStream(req.file.path)

      .pipe(csv())

      .on("data", (data) => {

        results.push(data);
      })

      .on("end", () => {

        if (results.length === 0) {

          return res.status(400).json({
            message: "CSV file is empty",
          });
        }

        results.forEach((item) => {

          // SAFE MESSAGE FETCH

          const message = item.message;

          // SKIP EMPTY ROWS

          if (!message || message.trim() === "") {

            console.log("Skipped Empty Row");

            return;
          }

          let positive = 0;
          let negative = 0;
          let neutral = 0;

          // CONVERT TO LOWERCASE SAFELY

          const text = message.toString().toLowerCase();

          // ===============================
          // SIMPLE AI SENTIMENT LOGIC
          // ===============================

          if (

            text.includes("good") ||
            text.includes("awesome") ||
            text.includes("great") ||
            text.includes("excellent") ||
            text.includes("love") ||
            text.includes("amazing") ||
            text.includes("best") ||
            text.includes("happy")

          ) {

            positive = 1;

          } else if (

            text.includes("bad") ||
            text.includes("worst") ||
            text.includes("hate") ||
            text.includes("terrible") ||
            text.includes("slow") ||
            text.includes("poor") ||
            text.includes("broken")

          ) {

            negative = 1;

          } else {

            neutral = 1;
          }

          // ===============================
          // INSERT INTO MYSQL
          // ===============================

          const sql = `
            INSERT INTO predictions
            (message, positive, neutral, negative)
            VALUES (?, ?, ?, ?)
          `;

          db.query(

            sql,

            [
              message,
              positive,
              neutral,
              negative,
            ],

            (err) => {

              if (err) {

                console.log("Database Error:", err);
              }
            }
          );
        });

        // DELETE FILE AFTER PROCESSING

        fs.unlinkSync(req.file.path);

        res.status(200).json({

          success: true,

          message:
            "CSV Uploaded Successfully & Predictions Saved",
        });
      })

      .on("error", (error) => {

        console.log(error);

        res.status(500).json({

          message: "CSV Processing Failed",
        });
      });
  }
);

module.exports = router;