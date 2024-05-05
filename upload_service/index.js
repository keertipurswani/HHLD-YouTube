import express from "express"
import uploadRouter from "./routes/upload.route.js"
import cors from "cors"
import dotenv from "dotenv"
import kafkaPublisherRouter from "./routes/kafkapublisher.route.js"


dotenv.config();
const port = process.env.PORT || 8080

const app = express();
app.use(cors({
    allowedHeaders: ["*"],
    origin: "*"
 }));
 
app.use(express.json());
app.use('/upload', uploadRouter);
app.use('/publish', kafkaPublisherRouter);


app.get('/', (req, res) => {
    res.send('HHLD YouTube')
 })
 
 
 app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
 })
 
