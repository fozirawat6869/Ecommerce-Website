import HandleError from "../utils/handleErrors.js";


 function error(err,req,res,next){
        let statusCode=err.statusCode || 500;
        let message=err.message || "Internal Server Error";
          

        // castError ( invalid mongo id)
        if(err.name==="CastError"){
           
            err=new HandleError(`id is invalid (CastError) : ${err.path}`,404)

             message=err.message
             statusCode=err.statusCode
            
        }

        res.status(statusCode).json({
            success:false,
            message:message

            // for those error like if i put short id (casteError)
            // message:err.stack
        });
    }

export default error;

// We are creating a class named CustomError
// It gets all the features of the built-in Error class
// Compare this snippet from backend/utils/handleErrors.js:
// class CustomError extends Error {