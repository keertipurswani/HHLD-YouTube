import {PrismaClient} from "@prisma/client"

const getAllVideos = async(req, res) => {
    const prisma = new PrismaClient();
    try {
        const allData = await prisma.$queryRaw`SELECT * FROM "VideoData"`;
        console.log(allData);
        return res.status(200).send(allData);
      } catch (error) {
        console.log('Error fetching data:', error);
        return res.status(400).send();
      }
}

export default getAllVideos;
