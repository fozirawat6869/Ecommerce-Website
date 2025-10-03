// import handleError from '../utils/handleErrors.js';

 function error(err,req,res,next){
        const statusCode=err.statusCode || 500;
        const message=err.message || "Internal Server Error";
        res.status(statusCode).json({
            success:false,
            message:message
        });
    }

export default error;
// We are creating a class named CustomError
// It gets all the features of the built-in Error class
// Compare this snippet from backend/utils/handleErrors.js:
// class CustomError extends Error {