const generateToken = require("../../Middlewares/generateToken");
const userSchema = require("../../models/userSchema")

exports.profileGet = async (req,res)=>{
    try {
        userSchema.findOne({_id : req.query.id}).then((data)=>{
            res.status(200).json(data)
           
        })
    } catch (error) {
        res.status(400).json({message:"error in finding user profile"})
    }
}

exports.addPhoto = async (req, res) => {
    let id = req.query.id;
    let pic = req.body.image;
  
    try {
      userSchema
        .updateOne({ _id: id }, { $set: { photo: pic } })
        .then((result) => {

          userSchema.findOne({_id : id}).then((data)=>{
            const {id,firstName,lastName,phone,email,status,photo,proof} = data
            let result = {
              id,
              firstName,
              lastName,
              email,
              phone,
              status,
              photo,
              proof,
              token : generateToken(id)
            }

            res.status(200).json(result)
          })
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    } catch (error) {
     res.status(400).json({message:"error while adding profile image"})
    }
  };

  exports.addProof = async (req,res)=>{
    const id = req.query.id
    const theProof = req.body.image


    try {
      userSchema
        .updateOne({_id : id},{$set : {proof : theProof}})
        .then((result)=>{

          userSchema
            .findOne({_id : id}).then((data)=>{
              const {
                id,
                firstName,
                lastName,
                email,
                phone,
                status,
                photo,
                proof
              } = data

              const result = {
                id,
                firstName,
                lastName,
                email,
                phone,
                status,
                photo,
                proof,
                token : generateToken(id)
              }
              res.status(200).json(result)
            })
        })
    } catch (error) {
      res.status(400).json({message:"error in adding proof "})
     
    }

  }

  exports.editProfile = async(req,res)=>{
    try {
      userSchema.updateOne({_id : req.query.id},
        {
          $set : {
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            phone : req.body.phone,
            email : req.body.email
          }
        }).then(()=>{
          userSchema.findOne({_id : req.query.id}).then((data)=>{
  
            const {id,firstName,lastName,phone,email,status,photo} = data
  
            const result = {
              id,
              firstName,
              lastName,
              email,
              phone,
              photo,
              status,
              token : generateToken(id)
            }
            res.status(200).json(result)
          })
        })
    } catch (error) {
      res.status(400).json({message:"error while editing profile"})
    }

    
  }