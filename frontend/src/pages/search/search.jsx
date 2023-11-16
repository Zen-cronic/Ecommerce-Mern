import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'


//search page - searchbar is a diff entitiy - compo
export const Search=()=> {

  const [searchParams, setSearchParams]= useSearchParams()
  const [matchedProducts, setMatchedProducts] = useState([])
  
  const searchQuery = searchParams ? searchParams.get("q"):null

  // const food= searchParams.get("food")

  // const encodedSearchQuery = encodeURI(searchQuery||"")

  // setSearchParams(encodedSearchQuery)

  useEffect(()=>{ 
    async  function fetchSearch() {
   
    // const response = await axios.post(`http://localhost:5005/search?q=${encodedSearchQuery}`)
    //  const response = await axios.post(`http://localhost:5005/?q=${searchQuery}`)
     const response = await axios.post(`http://localhost:5005/search?q=${searchQuery}`)

     searchParams? setMatchedProducts(response.data.matchingProducts) : setMatchedProducts([])
    // const {matchingProducts} = response.data
    // return matchingProducts
    // setSearchProducts(matchingProducts)
  }
  
   fetchSearch()
  }, [searchQuery]);
 



  return (
    <>Search rezult page


    {/* <p>My food: {food}</p> */}
    <p>Search Query: {searchQuery}</p>

    
    <ul>
    {matchedProducts.length > 0 ? matchedProducts.map((p,index)=> {

     return <li key={index}>{p.productName}</li>
    }):
    <p>Nu results found for {searchQuery}</p>}
    </ul>
    </>

  )
}
