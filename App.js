const express = require("express");
const path = require("path");
const app = express();

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
