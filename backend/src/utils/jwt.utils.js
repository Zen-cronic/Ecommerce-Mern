import jwt from "jsonwebtoken"


export const signJWT = (payload, secret, options = undefined ) => {

    const token = jwt.sign(payload, secret, options )

    return token
}

export const verifyJWT = (token, secret) => {

    try {
        const decoded = jwt.verify(token, secret)

        return{
            valid: true,
            expired: false,
            decoded
        }
    
    } catch (error) {
        console.error(error);

        return {
            valid: false,
            expired: true,
            decoded: undefined
        }
    }
  

}