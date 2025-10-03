import mysql2 from 'mysql2'
import dotenv from 'dotenv'

dotenv.config({path:'./config/config.env'})

const connection=mysql2.createConnection({
    host:process.env.host,
    port:process.env.port,
    database:process.env.database,
    password:process.env.password,
    user:process.env.user
})

connection.connect(()=>{
    console.log(`database connected to  ${process.env.port}`)
})

export default connection;

