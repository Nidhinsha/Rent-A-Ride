const bikeSchema = require("../../../models/bikeSchema")

exports.searchBikes = (req,res)=>{
    const itemsPerPage = 3
    const page = req.query.page || 1
    let pageCount
    let count
    let currentPage = Number(page)
    const skip = (itemsPerPage * page) - itemsPerPage
   
    try {
        bikeSchema.find(
            {
                $and:[
                    {
                        bikeName:
                            {
                                $regex : req.body.searchTerm,$options : 'i'
                            }
                    },
                    {
                        status: "accepted"
                    },
                    {
                        $or: [
                            {
                                ownerId: { $ne: req.query.id }
                            },
                            { ownerId: { $exists: false } }
                        ]
                    }
                ]
            }
        )
        .skip(skip)
        .limit(itemsPerPage)
        .then((data) => {
            bikeSchema.countDocuments({
                $and:[
                    {
                        bikeName:
                            {
                                $regex : req.body.searchTerm,$options : 'i'
                            }
                    },
                    {
                        status: "accepted"
                    },
                    {
                        $or: [
                            {
                                ownerId: { $ne: req.query.id }
                            },
                            { ownerId: { $exists: false } }
                        ]
                    }
                ]
                })
                .then((count) => {
                        pageCount = Math.ceil(count / itemsPerPage)
                        if (data.length === 0) {
                            res.status(404).json({
                              message: "No matching results were found",
                            });
                        }else{
                            const response = {
                                data: data,
                                pagination: {
                                    count: count,
                                    pageCount: pageCount,
                                    currentPage: currentPage
                                }
                            }
                            res.status(200).json(response)
                        }
                    })
                .catch((error) => {
                    res.status(400).json({ message: "cloud'nt fetch the data from the count in search " })
            })
        })

        .catch((error)=>{
            res.status(400).json({message : "error in the search"})
        })
    } catch (error) {
        res.status(400).json({ message: "cloud'nt fetch the data from the store" })
    }
    
}