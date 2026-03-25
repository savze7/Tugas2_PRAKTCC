console.log("ini ja;am");

// Import Package dan File
const express = require("express");
const sequelize = require("./config/database");
const noteRoutes = require("./routes/noteRoutes");

// Inisialisasi Express dan Cors
const app = express();
const cors = require("cors");
const path = require("path");

// CORS
app.use(cors({
  origin: [
    'http://localhost',
    'http://localhost:3000',
    'http://127.0.0.1:5500',
    'http://104.154.66.152'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

// Route dasar
app.get("/", (req, res) => {
  res.send("Notes API is running");
});

// Setting Routes
require("./schema/Note");
app.use("/api/v1/notes", noteRoutes);

// Sync DB & Run server
const port = process.env.PORT || 3000;
sequelize.sync()
  .then(() => {
    console.log("Database synced");
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("DB ERROR:", err);
  });