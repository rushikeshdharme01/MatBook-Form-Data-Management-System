require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const formRoutes = require("./routes/formRoutes");
const submissionRoutes = require("./routes/submissionRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api", formRoutes);
app.use("/api", submissionRoutes);

// Connect DB + Start server
const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}); 
