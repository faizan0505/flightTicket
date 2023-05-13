//Unable to found free Flight API, Every Flight API was paid version.
//So, make mock API and do my best

//to run backend set mongo atlas url in .env file 
//and in terminal type: npm run server (hit Enter)

const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const userRouter = require("./routes/userRoutes");
const passengerRouter = require("./routes/passengerRoutes");
const { connection } = require("./configs/db.js");

const app = express();

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/", userRouter)
app.use("/",passengerRouter)

app.listen(4300, async () => {
    try {
        await connection;
        console.log("DB connected successfully")
        console.log("Server is Running at port 4300")
    } catch (error) {
        console.log("Not connect DB" + error)
    }
})