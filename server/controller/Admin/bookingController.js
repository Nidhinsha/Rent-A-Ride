const bookingSchema = require("../../models/bookingSchema")
const moment = require("moment")

exports.adminGetBookedBikeController = async(req,res)=>{
    try {
       const data=await bookingSchema.
        aggregate(
          [
            {
              '$lookup': {
                'from': 'bikes', 
                'localField': 'bikeId', 
                'foreignField': '_id', 
                'as': 'result'
              }
            }, {
              '$project': {
                'bikeData': {
                  '$arrayElemAt': [
                    '$result', 0
                  ]
                }, 
                'totalHours': 1, 
                'totalAmount': 1, 
                'pickupLocation': 1, 
                'dropOffLocation':1,
                'needHelmet': 1, 
                'status' : 1,
                'startingTime': '$bookedTimeSlots.startDate', 
                'endingTime': '$bookedTimeSlots.endDate'
              }
            }, {
              '$project': {
                'bikeId' : '$bikeData._id',
                'bikeName': '$bikeData.bikeName', 
                'bikeModel': '$bikeData.bikeModel', 
                'color': '$bikeData.Color', 
                'totalHours': 1, 
                'totalAmount': 1, 
                'pickupLocation': 1, 
                'dropOffLocation':1,
                'needHelmet': 1, 
                'startingTime': 1, 
                'endingTime': 1, 
                'status' : 1,
                'photo': '$bikeData.photo', 
              }
            }
          ]
        )

        let startTime 
        let endTime
        let currentTime = moment().format('X')

        for(let i =0 ;i<data.length;i++){
          let startTime = moment(data[i].startingTime,'MMMM Do YYYY,h:mm:ss a').unix()
          let endTime = moment(data[i].endingTime,'MMMM Do YYYY, h:mm:ss a').unix()
        }

        if(currentTime > endTime){
          console.log('time exceeded');

          bookingSchema.findOneAndUpdate(
            {
              _id : data[i]._id
            },
            {
              $set:{
                status :"time exceeded"
              }
            }
          )
          .then((response)=>{
            console.log(response,'exceded response');
          })
        }else if(currentTime < startTime && data[i].status !== 'cancelled'){
          bookingSchema.findOneAndUpdate(
            {
              _id : data[i]._id
            },
            {
              $set:{
                status : "booked"
              }
            }
          )
          .then((response)=>{
            console.log(response,'booked response');
          })
        }else if(currentTime >= startTime && currentTime <= endTime && data[i].status !== "completed"){
          bookingSchema.findOneAndUpdate(
            {
              _id : data[i]._id
            },
            {
              $set:{
                status:"onRide"
              }
            }
          )
          .then((response)=>{
            console.log(response,'OnRide response');
          })
        }
        res.status(200).json(data)
        console.log(data,'final data in admin booking vieww');

    } catch (error) {
        res.status(400).json("error while fetching data")
    }
}