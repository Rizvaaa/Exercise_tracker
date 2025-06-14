const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
console.log("ATLAS_URI:", process.env.ATLAS_URI);  // Debug line


mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB database connection established successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// const exerciseRouter = require('./routes/exercise');
// app.use('/exercise', exerciseRouter);


app.use('/exercise',exercisesRouter);
app.use('/users',usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
