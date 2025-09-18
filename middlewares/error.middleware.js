//main format of middlewares
//information before request (err) -> middlewares -> information after request(next)
const errorMiddleware = (err, req, res, next) => {
    try {
        
        //hatanın kopyasını alır ve hata mesajını güncellerken aynı anda hatayı konsola yazdırır:
        let error = {...err} // copy of err object
        error.message = err.message

        //log to console for dev
        console.error(err)

    //TYPES OF ERRORS
        //Mongoose bad ObjectId
        if(err.name=== "CastError") {
            const message = `Resource not found.`;

            error = new Error(message);
            error.statusCode = 404;
        }

        //Mongoose duplicate key (trying to create something with a same key)
        if(err.code === 11000){
            const message = "Duplicate field value entered";

            error = new Error(message);
            error.statusCode = 400;
        }

        //Mongoose validation error (while create a docs but dont pass right params)
        if(err.name === "ValidationError"){
            //mapping the values + show a message for each one
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(", ")); 
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({success: false, error: error.message || "Server Error"});


    } catch (error) {
        next(error)
    }
};

export default errorMiddleware;

/**example of middleware logic:
 * Create a subscription -> middleware (check for renewal date) -> middleware(check for errors) -> next -> controller
 */