const multer = require("multer")

const storage = multer.diskStorage({ destination: "./storage/media", filename: (req, file, cb) => { cb(null, Date.now() + "-" + file.originalname); }, });

const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        // reject file 
        cb({ message: 'Unsupported file format' }, false)
    }
}

const upload = multer({
    storage: storage
})

module.exports = upload