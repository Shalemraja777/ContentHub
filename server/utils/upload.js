import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const storage = new GridFsStorage({
    url: `mongodb://user:codeforinterview@ac-tz54972-shard-00-00.ta9g9bn.mongodb.net:27017,ac-tz54972-shard-00-01.ta9g9bn.mongodb.net:27017,ac-tz54972-shard-00-02.ta9g9bn.mongodb.net:27017/?ssl=true&replicaSet=atlas-4jt23a-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({storage}); 