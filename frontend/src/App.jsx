
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/navbar";
import { Cart } from "./pages/cart/cart";
import { Auth } from './pages/auth/auth';
import { Shop } from "./pages/shop/shop";
import { ShopContextProvider } from './context/shop-context';
import { Checkout } from './pages/checkout/checkout';
// import History from './pages/history/history';  if export default fx History
import { History } from './pages/history/history';
import { Search } from './pages/search/search';


function App() {
 
  console.log(window.location)

  return (
    <>
    <div className='App'>
    <ShopContextProvider>
      <Router>

      {/* navbar contains srhbar */}
        <NavBar/>
      
        <Routes>

{/* from /auth to /users like in bckend */}
           <Route path='/users' element={<Auth/>}> </Route>
          <Route path='/' element={<Shop/>}> </Route>
          <Route path='/cart' element={<Cart/>}> </Route>

           {/*try separating cart and chekcout  */}
          <Route path='/checkout' element={<Checkout/>}></Route>

          {/* history path */}
          <Route path='/history' element={<History/>}></Route>

              {/* <Routes>
                <Route path='/cart/checkout' element={<Checkout/>}></Route>
              </Routes>   */}
            
          <Route path='/contact' ></Route>

{/* route for search - nu compo jsut route*/}
                {/* path='/search?q=' or just /search */}
              <Route path='/search' element={<Search/>}></Route>
        </Routes>
      </Router>
    </ShopContextProvider>
    </div>
    </>
  )
 
}



export default App
