import app from './app.js'
import dotenv from 'dotenv'
import dbServer  from './config/db.js';

dotenv.config({path:'./config/config.env'})
dbServer()
const port=process.env.PORT || 3000;



app.listen(port,()=>{
    console.log(`server running on port : ${port}`)
})