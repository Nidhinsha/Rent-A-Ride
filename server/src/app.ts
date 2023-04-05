import express from "express"

const app = express()

app.get('/',(req,res)=>{
    res.send("clean working")
})

app.listen(6000,() => {
    console.log(`server is runnig http://localhost:6000/`);
  })