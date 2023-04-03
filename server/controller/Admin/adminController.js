const adminSchema = require("../../models/adminSchema")
const userSchema = require("../../models/userSchema")

exports.adminUser = async (req,res) => {
  try {
    userSchema.find().then((data)=>{
      res.status(200).json(data)
  })
  } catch (error) {
    
  }
  
}

exports.blockUser = async (req, res) => {
    try {
      const result = await userSchema.findOne({ _id: req.query.id });
      await userSchema.updateOne(
        { _id: req.query.id },
        { $set: { status: !result.status } }
      );
      const data = await userSchema.find();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  


