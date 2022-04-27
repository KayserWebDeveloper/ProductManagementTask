const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require("./routes/routes");
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/productManagement',{useNewUrlParser:true});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/", router);

app.listen(PORT,() => {
    console.log(`Servering is running on port ${PORT}!`);
});