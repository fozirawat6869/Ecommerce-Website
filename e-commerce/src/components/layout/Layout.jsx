import { Outlet, useLocation } from "react-router-dom";
import Nav from "../nav/nav";
import Footer from "../footer/Footer";



function Layout(){

//    const location=useLocation();
//    const hide=location.pathname==='/login'   
  return(
    <>
    {/* {!hide && <Nav/>} */}
    <Nav/>
    <Outlet/>
    <Footer/>
    {/* {!hide && <Footer/>} */}
    </>
  )
}

export default Layout