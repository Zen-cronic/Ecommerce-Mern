
const sumOfTwo = (a,b) => {

  
    // || not &&
    if((typeof a !== "number") || typeof b !== "number"){
        throw new Error('the params must be numbers')
    }

    
    return a +b
}

export default sumOfTwo;