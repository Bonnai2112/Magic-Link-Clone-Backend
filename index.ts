import express, { Request, Response } from "express";
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import cors from 'cors';
import connectDB from './config/db';
import { authRouter, userRouter } from "./Routes";

const app = express();

const allowedOrigins = ["http://localhost:7070", "http://localhost:8080"];
const corsOption = {
  origin: (origin: any, callback: any) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not alowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(bodyParser.json({ limit: '10mb' })); // Adjust the limit as per your requirements
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' })); // Adjust the limit as per your requirements


app.use(cookieParser());
app.use(cors(corsOption));

app.use(express.json());

app.use("/link", authRouter);
app.use("/user", userRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: "API Working"
  })
})

connectDB();
app.listen(5000, () => {
  console.log(`server running on ${5000}`);
});
