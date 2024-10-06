import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/user', require('./routes/user'));
app.use('/api/group', require('./routes/group'));
app.use('/api/challenge', require('./routes/challenge'));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
