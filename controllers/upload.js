import { urlencoded } from 'express';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: './public/upload/',
    filename: function (req, file, cb) {
        const name_file = file.originalname.split(".")[0];
        cb(null, name_file + '.' + file.originalname.split(".")[1])
    }
})

function fileFilter(req, file, cb) {
    if (file.mimetype.split("/")[0] == "image") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10_000_000_000,
    }
})

