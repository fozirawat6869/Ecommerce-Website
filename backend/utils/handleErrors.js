// We are creating a class named CustomError
// It gets all the features of the built-in Error class
class CustomError extends Error {

  // This runs when we create the error: new CustomError("message", 404)
  constructor(message, statusCode) {
    
    // Call the parent (Error) class and pass the message
    // This sets the "message" property of the error
    super(message);

    // Save the status code (e.g. 404, 500) into the object
    this.statusCode = statusCode;

    // Optional: This helps remove this constructor from the error stack trace
    // So when we see the error in the terminal, it shows where it really came from
    Error.captureStackTrace(this, this.constructor);  

    /* 
     .captureStackTrace is a V8 engine feature (used in Node.js and Chrome)
     It creates a cleaner stack trace by excluding the constructor call
     This makes debugging easier by showing where the error was thrown.

     It takes two arguments:
     1. The error object (this)
     2`. A function to exclude from the stack trace (this.constructor)
     3. This is optional but helps in cleaner error logs.
     4. More info: https://v8.dev/docs/stack-trace-api#customizing-stack-traces
    */
  }
}

// Export it so we can use it in other files (like controllers)
export default CustomError;
