import express from "express";
import cors from "cors";
import authenticateJWT from "./middleware/auth";
import errorMiddleware from "./middleware/error";
import dotenv from "dotenv";
dotenv.config()

const app = express();

// Vite frontend
const allowedOrigin = 'http://localhost:5173';

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.EXPRESS_MIDDLEWARE) {
  app.use(<express.Handler>authenticateJWT);
}

app.use('/api/user', require('./routes/user'));
app.use('/api/group', require('./routes/group'));
app.use('/api/challenge', require('./routes/challenge'));

if (process.env.EXPRESS_MIDDLEWARE) {
  app.use(errorMiddleware);
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
