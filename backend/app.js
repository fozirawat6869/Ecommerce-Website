import express from 'express'
import product from './routes/productRoute.js'
import errorHandleMiddleware from './middleware/error.js'
import cors from 'cors'


const app=express();
 
app.use(cors({
    origin:"http://localhost:5173"
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api',product)

app.use(errorHandleMiddleware)
export default app;