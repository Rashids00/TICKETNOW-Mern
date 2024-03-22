const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const cors = require('cors');
const { errorHandler } = require("./controllers/MovieCon")
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(errorHandler);

let userApi = require("./routes/userApi")
app.use("/userApi", userApi)

let adminApi = require("./routes/adminApi")
app.use("/adminApi", adminApi)

let movieApi = require("./routes/movieApi")
app.use("/movieApi", movieApi)

let bookingApi = require("./routes/bookingApi")
app.use("/bookingApi", bookingApi)

mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.g2x4v5y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
        console.log("Connection Successfull");
    }).catch((e) => console.log(e));

app.listen(8080, () => {
    console.log(`Server started on the port ${8080}`);
});
 