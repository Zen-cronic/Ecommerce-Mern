import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
export const SearchBar=()=> {


    // const [searchParams, setSearchParams]= useSearchParams({q: ""}) 
    const [searchParams, setSearchParams]= useSearchParams() 

    const [searchQuery, setSearchQuery] = useState(searchParams? searchParams.get('q') : null)

    // console.log(searchParams.get("q"))

   
    const navigate = useNavigate()

    // const searchQuery = 
    const onSearch =(e)=> {

        e.preventDefault()

        if(!searchQuery){

            setSearchParams("")
            return
        }
        
        const encodedSearchQuery = encodeURI(searchQuery|| "")

    //added from react_serach_1  --- NOT necessary
        // setSearchParams({q: encodedSearchQuery})

        // navigate(`/search?q=${searchParams}`)
        navigate("/search?q=" + encodedSearchQuery)
        // navigate("/search?q=" + searchQuery)

        // setSearchParams("")
        // setSearchQuery("")

    }
    return(
        <form onSubmit={onSearch}>

            <input 
                // value={searchParams}
                value={searchQuery|| ""}
                // onChange ={e=> setSearchParams(e.target.value)}
                // onChange ={e=> setSearchParams({q: e.target.value})}
                onChange ={e=> setSearchQuery( e.target.value.toLowerCase())}
                placeholder="Search here"
            />

            <button type="submit">Search</button>
        </form>
    )
}