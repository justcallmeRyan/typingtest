import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import wordsRoute from "./routes/words.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";



const app = express();
dotenv.config()
app.use(bodyParser.urlencoded({ extended: true }))


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB");
    } catch (error) {
        throw(error);
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected.")
})

app.get('/', (req,res) => {
    res.send("hello");
})

//middlewares
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/words", wordsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,

    });
});

app.listen(5000, () => {
    connect()
    console.log("Listening on port 5000");
})