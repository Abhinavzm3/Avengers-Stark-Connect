import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import bookMark  from "./routes/bookMark.route.js";
import botRoute from './routes/botRoute.js'
import blogRoute from './routes/blog.routes.js'

dotenv.config({});

const app = express();


// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    // origin:'https://stark-connect.netlify.app',
    // origin:'https://stark-connect-seven.vercel.app/',
    credentials:true
}

app.get('/',(req,res)=>{
    res.send("this is backend on 3000 port")
})

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/bookmark",bookMark);
app.use("/api/v1",botRoute);
app.use("/api/v1/blog",blogRoute);



app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})