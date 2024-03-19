import express  from "express";
dotenv.config()
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { notFound,errorHandler } from "./middleWare/errorMiddleWare.js";
import connectDB from "./config/dbConnect.js";
import  userRoutes from './routes/userRoutes.js'


const PORT = process.env.PORT || 5000;

connectDB()

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())


app.use('/api/users', userRoutes);
app.get("/",(req,res)=>res.send("server is ready"))

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () =>
  console.log(`Server is running At http://localhost:${PORT}`)
);