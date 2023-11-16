import express from 'express'
import ProductModel  from '../models/Products.js'
const router = express.Router()



//api endpint is just /search, but the frontend url will have params with query
// router.post("/?q=:query", async(req, res)=> {
router.post("/", async(req, res)=> {
    // `?=${encodedSearchQuery}`

    // same as blw 2 lines
    const {q}= req.query
    // const {searchParams} = new URL(req.url,  `http://${req.headers.host}`)
    // const searchQuery = searchParams.get("q")

    
    try {
        if( typeof q !== 'string' || !q){

            res.status(401).json({message: "cannot search cuz q is not query"})
            
        }

        //searching algo
//get all prodcuts name
        // const products = await ProductModel.find({})
        // const productNames = products.map(product => (product.productName))


        // .populate('productName')

    //try wo productNames blw
        // const matchingProductNames = productNames.filter(productName=> (productName.toLowerCase().includes(q.toLowerCase())))

        // const matchingProductNames = products.filter(product => (product["productName"].toLowerCase().includes(q.toLowerCase())))
        // const mongoQuery = {productName: q}
        // const mongoQuery ={ productName.toLowerCase().includes(q.toLowerCase()) :q }

        // const products = await ProductModel.find(mongoQuery)

  //try w async map blw - works!
        // const matchingProducts = matchingProductNames.map( async(p)=> {

        //     const query = {productName: p}
        //     return await ProductModel.find(query)
        // })

        //v0
        // const products = await ProductModel.find({})
        // const productNames = products.map(product => (product.productName))

        // const matchingProductNames = productNames.filter(productName=> (productName.toLowerCase().includes(q.toLowerCase())))

        // const matchingProducts = await Promise.all(matchingProductNames.map( async(p)=> {

        //     const dbQuery = {productName: p}
        //     return await ProductModel.findOne(dbQuery).exec()
        // }))

        //v1 aft au from react search

        //prop key of each Products obj - can make it an arr if description added
        const filteringProductName = "productName"

        const allProducts = await ProductModel.find({})

        const matchingProducts = allProducts.filter(p=>(
            p[filteringProductName].toLowerCase().includes(q.toLowerCase())
        ))
        
        res.json({searchTerm_Q:q,
            //  searchQuery
            // products
            // matchingProductNames,
            matchingProducts
            })

    } catch (error) {
        console.log(error)
    }
})


router.get("/", async(req, res)=> {

    res.json({message: "get req to /search"})
})

export {router as searchRouter}