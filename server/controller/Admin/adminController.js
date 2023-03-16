const adminSchema = require("../../models/adminSchema")
const userSchema = require("../../models/userSchema")

exports.adminUser = async (req,res) => {
    userSchema.find().then((data)=>{
        console.log(data,'bnbnbnbn');
        res.status(200).json(data)
    })
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
  



// exports.blockUser = async (req, res) => {
//     console.log(req.query.id,'iddd block');
//     userSchema.findOne({ _id: req.query.id }).then((result) => {
//       userSchema.updateOne(
//         { _id: req.query.id },
//         { $set: { status: !result.status } },
//         function (err, respo) {
//           if (err) {
//             console.log(err);
//           }
//         }
//       );
//     });
  
//     userSchema.find().then((data) => {
//       res.status(200).json(data);
//     });
//   };


