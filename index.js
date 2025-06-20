const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/connect');
require('dotenv').config();
const port = process.env.PORT || 8080;

//middlewares
app.use(express.json({ limit: "50mb" }));
app.use(cors());



const AdminRoutes = require("./Router/AdminRouter");


app.use("/api/Admin", AdminRoutes);

//server test route
app.get("/", (req, res) => {
    res.status(200).json({ message: "AG server is running" })
})

//connection to database
connectDB(process.env.MONGO_URI);



//server listenng 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})