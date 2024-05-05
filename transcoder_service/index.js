import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import KafkaConfig from "../upload_service/kafka/kafka.js";
import convertToHLS from "./hls/transcode.js";
import s3ToS3 from "./hls/s3Tos3.js";


dotenv.config();
const port = 8081

const app = express();
app.use(cors({
    allowedHeaders: ["*"],
    origin: "*"
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('HHLD YouTube service transcoder')
})

app.get('/transcode', (req, res) => {
    s3ToS3();
    //convertToHLS();
    res.send('Transcoding done');
})

const kafkaconfig = new KafkaConfig()
kafkaconfig.consume("transcode", (value) => {
    console.log("Got data from kafka : ", value)
})


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
})

