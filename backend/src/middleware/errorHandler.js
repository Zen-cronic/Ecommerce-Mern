

const errorHandler = (err,req,res,next) => {

    //how to customize mongo error status with custom error? e.g. 404 not found
    const statusCode = res.statusCode === 200 ? 404: res.statusCode

    const message = err.message

    res.status(statusCode)
    res.json({message, stack: err.stack})
}

export default errorHandler;