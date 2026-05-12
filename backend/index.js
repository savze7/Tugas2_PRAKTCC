const express = require("express");
const sequelize = require("./config/database");
const noteRoutes = require("./routes/noteRoutes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Notes API is running");
});

require("./schema/Note");
app.use("/api/v1/notes", noteRoutes);

const port = process.env.PORT || 8080;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});

// sequelize.sync()
//   .then(() => console.log("Database synced"))
//   .catch((err) => console.error("DB ERROR:", err));