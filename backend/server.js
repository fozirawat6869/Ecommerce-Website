import app from './app.js'

import connection from './config/sqldb.js'


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