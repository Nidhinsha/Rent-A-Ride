const userSchema = require("../../../models/userSchema")
const chatSchema = require("../../../models/ChatSchema")

exports.userContactController = async(req,res)=>{
    try {
            const contacts = await userSchema.find({
                _id : {$ne :req.query.id }
            })
            .select([
                "email",
                "firstName",
                "lastName",
                "status",
                "photo"
            ])
            return res.status(200).json(contacts)
            
    } catch (error) {
        res.status(400).json({message:"error while finding contacts"})
    }
}

exports.addMessageController =async(req,res)=>{
    try {
        const {from,to,message} = req.body.data

        const data = await chatSchema.create({
            message :{
                text:message
            },
            users:[from,to],
            sender:from
        })

        if(data){
            res.status(201).json({msg:"Message added Succesfully"})
        }else{
            res.status(400).json({msg:"Failed to add Message to the database"})
        }
    } catch (error) {
        res.status(400).json({message:"error in adding Message"})
    }
}

exports.sendImageController =async(req,res)=>{
    try {
        const {from,to,image} = req.body.data

        const data = await chatSchema.create({
            message:{
                text:'',
                image:image
            },
            users:[from,to],
            sender:from
        })

        if(data){
            res.status(201).json({msg:"Image added Successfully"})
        }else{
            res.status(400).json({msg:"Failed to add Image to the database"})
        }
    } catch (error) {
        res.status(400).json({message:"error in adding adding image"})
    }
}

exports.getAllMessageController =async(req,res)=>{
    try {
        const {from,to} = req.body.data
        const messages = await chatSchema.find({
            users:{
                $all:[
                    from,to
                ]
            }
        })
        .sort({updatedAt:1})

        const projectedMessages = messages.map((msg)=>{
            return{
                fromSelf :msg.sender.toString() === from,
                message : msg.message.text
            }
        })

       return res.status(200).json(projectedMessages)
    } catch (error) {
        return res.status(400).json({message:"error while finding messages"})
    }
}