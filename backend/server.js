import express  from "express";
dotenv.config()
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { notFound,errorHandler } from "./middleWare/errorMiddleWare.js";
import connectDB from "./config/dbConnect.js";
import  userRoutes from './routes/userRoutes.js'
import adminRoutes from "./routes/adminRoutes.js";

const PORT = process.env.PORT || 5000;

connectDB()

const app = express();
app.use(express.static("backend/public")); 

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())


app.use('/api/users', userRoutes);
app.use("/api/admin", adminRoutes);
app.get("/", (req, res) => {
  // Send a simple HTML response with an image
  res.send(`
        <html>
            <body>
                <h1>Server is ready</h1>
                <img src="/images/example.jpg" alt="Example Image"  width=500px/>
            </body>
        </html>
    `);
});

// Serve static files from the 'public' folder (assuming the image is stored there)


app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () =>
  console.log(`Server is running At http://localhost:${PORT}`)
);