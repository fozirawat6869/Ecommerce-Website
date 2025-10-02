import mongoose from 'mongoose'
 
 const dbServer=()=>{
    const dbPort=process.env.MONGO_URI
    console.log(dbPort)
    mongoose.connect(dbPort)
.then(()=>{
    console.log("connect to the database", dbPort)
})
.catch((error)=>{
    console.log("error :- not connected to the database",error.message)
})
}
export default dbServer