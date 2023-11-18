

const errorHandler = (err,req,res,next) => {

    //how to customize mongo error status with custom error? e.g. 404 not found
    let statusCode 
    
    if(res.statusCode === 200){
        statusCode = 200
    }
    
    //mongo err - chg to 500
    if(res.statusCode === null ){
        statusCode = 500
    }

    statusCode =res.statusCode

    const message = err.message

    res.status(statusCode)
    res.json({message, stack: err.stack})
}

export default errorHandler;