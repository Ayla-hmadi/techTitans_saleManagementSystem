// // app.js

// const express = require("express");
// const app = express();
// const branchyRoutes = require("./routes/branchRoutes");


// app.use(express.json());

// // Routes
// app.use("/branches", branchyRoutes);

// app.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });


const express = require('express');
const bodyParser = require('body-parser');
const branchRoutes = require('./routes/branchRoutes');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/branches', branchRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
