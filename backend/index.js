const express = require("express");
const cors = require("cors");

const noteRoutes = require("./routes/noteRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route test
app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});

// Routes utama
app.use("/api/v1/notes", noteRoutes);

// 🚀 WAJIB Cloud Run
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});