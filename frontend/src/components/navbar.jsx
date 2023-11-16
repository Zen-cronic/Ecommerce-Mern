import { React } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css"
import { FaShoppingCart } from "react-icons/fa";

import { useCookies } from "react-cookie";
import { SearchBar } from "./searchbar";

export const NavBar = () => {

    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout=()=>{

        setCookies("access_token", "")
        window.localStorage.removeItem("userID")

        navigate("/users")

    }
    return(
        <>
    <div className="navbar">
        <div className="links">
        
        {!cookies.access_token ? (
        <Link to="/users">Login/Register</Link>
      ) : (
        <button onClick={logout}> Logout </button>
      )}
            <Link to="/">Shop</Link>
            <Link to="/cart"    >
                <FaShoppingCart size={40}/>
            </Link>
            
            <Link to="/contact">contact</Link>

            {/* <Link to="/checkout" is NOT part of navbar */}
            <div id='search-bar'>
          <SearchBar/>
        </div>
        </div>
    </div>

</>
    )

}