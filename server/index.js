const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');


const app = express();
const router = require('./Routes/roter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/",router)


const mongoURI = 'mongodb+srv://askarvdt:420@cluster0.kdmfu0e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI).then(()=>console.log("DB Connected")).catch((err)=>{console.log(err)})

app.listen(8000, () => {
    console.log("Server started on port 8000")
})