

// Wraps an async controller to catch errors automatically
const handleAsyncErrors = (fn) => {
  return (req, res, next) => {
    // Call the async function and catch any rejected promise
    fn(req, res, next).catch(next);
  };
};

export default handleAsyncErrors;
