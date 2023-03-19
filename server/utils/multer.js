const multer = require("multer")

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        db(null,'./uploads')
    },
    filename : function(req,file,cb){
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

const fileFilter = (req,file,cb)=>{
    
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        db(null,true)
    }else{
        // reject file 
        cb({message : 'Unsupported file format'}, false)
    }
}

const upload = multer({
    storage : storage,
    limits: {fileSize : 1024 * 1024},
    fileFilter : fileFilter
})

module.exports = upload