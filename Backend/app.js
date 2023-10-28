require ("dotenv").config()
const express= require ("express")
const cors= require("cors")
const userRoutes= require("./routes/userRoutes")
const connectToDB= require("./config/db")
const cookieParser = require("cookie-parser")

const app= express()

//custom middleware
const auth= require("./middleware/auth")

//Middleware
app.use(cors()) //app.use(cors({origin: true, credentials: true}))
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cookieParser())

connectToDB()
app.use("/", userRoutes)

module.exports= app