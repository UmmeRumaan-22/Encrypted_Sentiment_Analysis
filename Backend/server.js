const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const csvRoutes = require("./routes/csvRoutes");


dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/csv", csvRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/sentiment",
  require("./routes/sentimentRoutes")
);

app.use(
  "/api/upload",
  require("./routes/uploadRoutes")
);

app.post("/api/test", (req, res) => {
  res.json({ message: "API working" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});