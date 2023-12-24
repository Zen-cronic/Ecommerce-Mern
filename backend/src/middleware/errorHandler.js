

const errorHandler = (err,req,res,next) => {

    let statusCode 
    
    if(res.statusCode === 200){
        statusCode = 200
    }
    
    //mongo err - chg to 500
    else if(res.statusCode === null ){
        statusCode = 500
    }

    else 
        statusCode =res.statusCode

    const message = err.message

    res.status(statusCode)
    res.json({message, stack: err.stack})
}

export default errorHandler;