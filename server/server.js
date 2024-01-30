require("dotenv").config(); // For environment variables

// Import
const express = require("express")
const morgan = require("morgan")
const db = require("./db")

// Create instance of express app
const app = express();

// Create middleware
app.use(express.json({})) // creates a body in the post req.body



// Define a route (get all restaurants)
app.get("/api/v1/restaurants", async (req, res) => //response and request
{
    try
    {
        const results = await db.query("select * from restaurants");
        console.log(results.rows);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data:
            {
                restaurant: results.rows
            },
        });
    }
    catch (err)
    {
        console.log(err);
        res.status(404);
    }
});



// Get a restaurant (singular) ||| req, res is called a route handler
app.get("/api/v1/restaurants/:id", async (req, res) => 
{
    try
    {
        // $1 will be replaced by req.params.id
        const results = await db.query("select * from restaurants where id = $1", [req.params.id]);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        });
    }
    catch (err)
    {
        console.log(err);
        res.status(404);
    }
});



// Create a restaurant
app.post("/api/v1/restaurants", async (req, res) =>
{
    try
    {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range]);
        console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        })
    }
    catch (err)
    {
        res.status(404);
        console.log(err);
    }
});

// Update a restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => 
{
    try
    {
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        console.log(req.body);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        })
    }
    catch (err)
    {
        res.status(404);
        console.log(err);
    }
});

// Delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => 
{
    try
    {
        const results = await db.query("DELETE FROM restaurants WHERE id = $1", [req.params.id]);
        res.status(204).json({
            status: "success"
        });
    }
    catch (err)
    {
        res.status(404);
        console.log(err);
    }
});


const port = process.env.PORT || 3001;
app.listen(port, ()=>
{
console.log(`server is up listening on port ${port}`);
});

