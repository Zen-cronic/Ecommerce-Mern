

const errorHandler = (err,res,req,next) => {

    const statusCode = res.statusCode === 200 ? 500: res.statusCode

    const message = err.message

    res.status(statusCode)
    res.json({message, stack: err.stack})
}

export default errorHandler;