import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import watchRouter from "./routes/watch.route.js"

dotenv.config();

const port = process.env.PORT || 8082;
const app = express();

app.use(cors({
   allowedHeaders: ["*"],
   origin: "*"
}));

app.use(express.json());

app.use('/watch', watchRouter);

app.get('/', (req, res) => {
   res.send('HHLD YouTube Watch Service')
})

app.listen(port, () => {
   console.log(`Server is listening at http://localhost:${port}`);
})