const generateToken = require("../../Middlewares/generateToken");
const userSchema = require("../../models/userSchema")

exports.profileGet = async (req,res)=>{
    try {
        console.log(req.query.id,'profile query');
        userSchema.findOne({_id : req.query.id}).then((data)=>{
            res.status(200).json(data)
            console.log(data,'user data profile');
        })
    } catch (error) {
        // console.log(error,'user profile feching eror');
    }
}

exports.addPhoto = async (req, res) => {
    let id = req.query.id;
    let pic = req.body.image;
    console.log(id + "THIS IS THE PHOYO");
    console.log("TJHO O _ JAFDKAJSFHD FJLKLJKDSHF KHFJKLSDH FJSKDHF ");
    console.log(req.body);
  
    try {
      userSchema
        .updateOne({ _id: id }, { $set: { photo: pic } })
        .then((result) => {
          console.log(result,'updated');

          userSchema.findOne({_id : id}).then((data)=>{
            const {id,firstName,lastName,phone,email,status,photo} = data
            let result = {
              id,
              firstName,
              lastName,
              email,
              phone,
              status,
              photo,
              token : generateToken(id)
            }

            console.log(result,'result is the user profile update data fetch');

            res.status(200).json(result)
          })
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    } catch (error) {
      // res.status(401).json(error)
      console.log('error',error,'eroor in udpate prodile');
    }
  };