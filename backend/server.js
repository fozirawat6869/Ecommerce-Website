import app from './app.js'
import dotenv from 'dotenv'
import dbServer  from './config/db.js';

dotenv.config({path:'./config/config.env'})
dbServer()
const port=process.env.PORT || 3000;



const server=app.listen(port,()=>{
    console.log(`server running on port : ${port}`)
})

process.on("unhandledRejection",(err)=>{
    console.log(err.message)
    console.log("server goes down");

    server.close(()=>{
        process.exit(1)
    })
})