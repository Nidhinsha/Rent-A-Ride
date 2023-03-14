const userSchema = require("../../models/userSchema")

exports.profileGet = async (req,res)=>{
    try {
        console.log(req.query.id,'profile query');
        userSchema.findOne({_id : req.query.id}).then((data)=>{
            res.json(data)
            console.log(data,'user data profile');
        })
    } catch (error) {
        console.log(error,'user profile feching eror');
    }
}

exports.addPhoto = async (req, res) => {
    let id = req.query.id;
    let pic = req.body.photo;
    console.log(id + "THIS IS THE PHOYO");
    console.log("TJHO O _ JAFDKAJSFHD FJLKLJKDSHF KHFJKLSDH FJSKDHF ");
    console.log(pic);
  
    try {
      userSchema
        .updateOne({ _id: id }, { $set: { photo: pic } })
        .then((data) => {
          console.log(data);
          console.log("THIS IS DATA");
          res.status(200).json("PHOTO IS UPDATED");
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    } catch (error) {}
  };