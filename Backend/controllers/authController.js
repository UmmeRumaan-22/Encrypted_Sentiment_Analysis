const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const db = require("../config/db");


// ================= REGISTER =================

const registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // VALIDATION

    if (!name || !email || !password) {

      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // CHECK USER

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],

      async (err, result) => {

        if (err) {

          console.log(err);

          return res.status(500).json({
            message: "Database Error",
          });
        }

        // USER EXISTS

        if (result.length > 0) {

          return res.status(400).json({
            message: "User already exists",
          });
        }

        // HASH PASSWORD

        const salt =
          await bcrypt.genSalt(10);

        const hashedPassword =
          await bcrypt.hash(password, salt);

        // INSERT USER

        const sql = `
          INSERT INTO users
          (name, email, password)
          VALUES (?, ?, ?)
        `;

        db.query(
          sql,
          [
            name,
            email,
            hashedPassword,
          ],

          (err, data) => {

            if (err) {

  console.log(err);

  return res.status(500).json({
    message: err.sqlMessage,
  });
}

            return res.status(201).json({
              message:
                "User Registered Successfully",
            });
          }
        );
      }
    );

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};


// ================= LOGIN =================

const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {

      return res.status(400).json({
        message:
          "Email and Password are required",
      });
    }

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],

      async (err, result) => {

        if (err) {

  console.log("FULL MYSQL ERROR:");
  console.log(err);

  return res.status(500).json({
    message: JSON.stringify(err),
  });
}

        // USER NOT FOUND

        if (result.length === 0) {

          return res.status(400).json({
            message: "Invalid Email",
          });
        }

        const user = result[0];

        // CHECK PASSWORD

        const isMatch =
          await bcrypt.compare(
            password,
            user.password
          );

        if (!isMatch) {

          return res.status(400).json({
            message: "Invalid Password",
          });
        }

        // TOKEN

        const token = jwt.sign(
          {
            id: user.id,
            name: user.name,
          },

          process.env.JWT_SECRET,

          {
            expiresIn: "7d",
          }
        );

        // RESPONSE

        return res.status(200).json({

          message: "Login Successful",

          token,

          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      }
    );

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};


module.exports = {
  registerUser,
  loginUser,
};