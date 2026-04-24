import express from 'express'
import product from './routes/productRoute.js'
import errorHandleMiddleware from './middleware/error.js'
import cors from 'cors'


const app=express();
 
app.use(cors({
     // origin: process.env.CORS_ORIGIN
     origin: "http://localhost:5174"
}))





app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api',product) // app.use('/api',user) // for user related routes

app.use('/uploads',express.static('uploads')) // to serve static files from uploads folder

// app.use(isAuthenticated)

app.use(errorHandleMiddleware)
export default app;