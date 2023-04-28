const bikeSchema = require("../../../models/bikeSchema")

exports.displayBikeController = async (req, res) => {

    const itemsPerPage = 3
    const page = req.query.page || 1
    let pageCount
    let count
    let currentPage = Number(page)
    const skip = (itemsPerPage * page) - itemsPerPage
    try {
        bikeSchema.find({
            $and: [
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
        .skip(skip)
        .limit(itemsPerPage)
        .then((data) => {
            bikeSchema.countDocuments({
                $and: [
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
                        const response = {
                            data: data,
                            pagination: {
                                count: count,
                                pageCount: pageCount,
                                currentPage: currentPage
                            }
                        }
                        res.status(200).json(response)
                    })
                .catch((error) => {
                        res.status(400).json({ message: "cloud'nt fetch the data from the count" })
                })
        })
        .catch((error) => {
                res.status(400).json({ message: "cloud'nt fetch the data from the data" })
    })
    } catch (error) {
        res.status(400).json({ message: "cloud'nt fetch the data from the store" })
    }
}