import KafkaConfig from "../kafka/kafka.js";

const sendMessageToKafka = async (req, res) => {
   console.log("got here in upload service...")
   try {
       const message = req.body
       console.log("body : ", message)
       const kafkaconfig = new KafkaConfig()
       const msgs = [
           {
               key: "key1",
               value: JSON.stringify(message)
           }
       ]
       const result = await kafkaconfig.produce("transcode", msgs)
       console.log("result of produce : ", result)
       res.status(200).json("message uploaded successfully")

   } catch (error) {
       console.log(error)
   }
}
export default sendMessageToKafka;

export const pushVideoForEncodingToKafka = async(title, url) => {
    try {
        const message = {
            "title": title,
            "url": url
        }
        console.log("body : ", message)
        const kafkaconfig = new KafkaConfig()
        const msgs = [
            {
                key: "video",
                value: JSON.stringify(message)
            }
        ]
        const result = await kafkaconfig.produce("transcode", msgs)
        console.log("result of produce : ", result)
        res.status(200).json("message uploaded successfully")
 
    } catch (error) {
        console.log(error)
    }
}
