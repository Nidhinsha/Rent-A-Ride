const bikeSchema = require("../../../models/bikeSchema")

exports.getBrands = async (req, res) => {

    try {
        const brands = await bikeSchema.distinct('brand')
        res.status(200).json(brands)
    } catch (error) {
        res.status(400).json("error in finding brands")
    }
}

exports.getBikeWithBrand = async (req, res) => {
    const itemsPerPage = 4
    const page = req.query.page || 1
    let pageCount
    let count
    let currentPage = Number(page)
    const skip = (itemsPerPage * page) - itemsPerPage

    const brand = req.query.brand
    const userId = req.query.id
    const color = req.query.color
    console.log(typeof req.query.color, req.query.color, 'colcolcocl');

    try {
        if (userId !== "undefined") {

            if (brand !== null &&  color !== "null") {

                bikeSchema.find({
                    $and: [
                        {
                            color:
                            {
                                $regex: color, $options: 'i'
                            }
                        },
                        {
                            brand: brand
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
                    .skip(skip)
                    .limit(itemsPerPage)
                    .then((data) => {
                        bikeSchema.countDocuments({
                            $and: [
                                {
                                    color:
                                    {
                                        $regex: color, $options: 'i'
                                    }
                                },
                                {
                                    brand: brand
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
                                const response = {
                                    data: data,
                                    pagination: {
                                        count: count,
                                        pageCount: pageCount,
                                        currentPage: currentPage
                                    }
                                }
                                res.status(200).json(response)
                                console.log(response,'1 if');
                            })
                            .catch((error) => {
                                res.status(400).json({ message: "cloud'nt fetch the data from the count" })
                            })
                    })
                    .catch((error) => {
                        res.status(400).json({ message: "cloud'nt fetch the data from the branded bike" })
                    })

            } else if (brand !== null && color === "null") {

                bikeSchema.find({
                    $and: [
                        {
                            brand: brand
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
                    .skip(skip)
                    .limit(itemsPerPage)
                    .then((data) => {
                        bikeSchema.countDocuments({
                            $and: [
                                {
                                    color:
                                    {
                                        $regex: color, $options: 'i'
                                    }
                                },
                                {
                                    brand: brand
                                },
                                {
                                    status: "accepted"
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
                                console.log(response,'1 else if');
                            })
                            .catch((error) => {
                                res.status(400).json({ message: "cloud'nt fetch the data from the count" })
                            })
                    })
                    .catch((error) => {
                        res.status(400).json({ message: "cloud'nt fetch the data from the branded bike" })
                    })
            }
        } else if ( userId === "undefined") {
            if (brand !== null && color !== "null") {

                bikeSchema.find({
                    $and: [
                        {
                            color:
                            {
                                $regex: color, $options: 'i'
                            }
                        },
                        {
                            brand: brand
                        },
                        {
                            status: "accepted"
                        }
                    ]
                })
                    .skip(skip)
                    .limit(itemsPerPage)
                    .then((data) => {
                        bikeSchema.countDocuments({
                            $and: [
                                {
                                    color:
                                    {
                                        $regex: color, $options: 'i'
                                    }
                                },
                                {
                                    brand: brand
                                },
                                {
                                    status: "accepted"
                                },
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
                                console.log(response,'2 if');
                            })
                            .catch((error) => {
                                res.status(400).json({ message: "cloud'nt fetch the data from the count" })
                            })
                    })
                    .catch((error) => {
                        res.status(400).json({ message: "cloud'nt fetch the data from the branded bike" })
                    })

            } else if (brand !== null && color === "null") {

                bikeSchema.find({
                    $and: [
                        {
                            brand: brand
                        },
                        {
                            status: "accepted"
                        }
                    ]
                })
                    .skip(skip)
                    .limit(itemsPerPage)
                    .then((data) => {
                        bikeSchema.countDocuments({
                            $and: [
                                {
                                    brand: brand
                                },
                                {
                                    status: "accepted"
                                }
                            ]
                        }
                        )
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
                                console.log(response,'2 elseif');
                            })
                            .catch((error) => {
                                res.status(400).json({ message: "cloud'nt fetch the data from the count" })
                            })
                    })
                    .catch((error) => {
                        res.status(400).json({ message: "cloud'nt fetch the data from the branded bike" })
                    })
            }
        }


    } catch (error) {
        res.status(400).json("error finding brand with bike")
    }
}