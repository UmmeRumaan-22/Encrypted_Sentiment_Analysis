const db = require("../config/db");

const predictSentiment = async (req, res) => {

  try {

    const { message } = req.body;

    // SIMPLE AI LOGIC

    let positive = 0;
    let neutral = 0;
    let negative = 0;

    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes("good") ||
      lowerMessage.includes("great") ||
      lowerMessage.includes("awesome") ||
      lowerMessage.includes("excellent")
    ) {

      positive = 1;

    } else if (
      lowerMessage.includes("bad") ||
      lowerMessage.includes("worst") ||
      lowerMessage.includes("hate")
    ) {

      negative = 1;

    } else {

      neutral = 1;
    }

    // SAVE TO MYSQL

    const sql = `
      INSERT INTO predictions
      (user_id, message, positive, neutral, negative)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        req.user.id,
        message,
        positive,
        neutral,
        negative,
      ],
      (err, result) => {

        if (err) {

          console.log(err);

          return res.status(500).json({
            message: "Database Error",
          });
        }

        res.status(200).json({

          prediction: {
            positive,
            neutral,
            negative,
          },

        });
      }
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getHistory = (req, res) => {

  const sql = `
    SELECT * FROM predictions
    WHERE user_id = ?
    ORDER BY id DESC
  `;

  db.query(
    sql,
    [req.user.id],
    (err, results) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          message: "Database Error",
        });
      }

      res.json(results);
    }
  );
};

module.exports = {
  predictSentiment,
  getHistory,
};