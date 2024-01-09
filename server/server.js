require("dotenv").config(); // For environment variables
const express = require("express")

// Create instance of express app
const app = express()

const port = process.env.PORT || 3001;
app.listen(port, ()=>
{
console.log(`server is up listening on port ${port}`);
});

