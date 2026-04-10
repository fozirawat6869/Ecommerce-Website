import { Outlet, useLocation } from "react-router-dom";
import Nav from "../nav/nav";
import Footer from "../footer/Footer";
import { jwtDecode } from "jwt-decode";
import AdminNav from "../nav/AdminNav";



function Layout(){

//    const location=useLocation();
//    const hide=location.pathname==='/login'   

   const token = localStorage.getItem("token"); 
    const decodedToken=jwtDecode(token)
    const role=decodedToken.role

  return(
    <>
    {/* {!hide && <Nav/>} */}
    {role!=="admin"?<Nav/>:<AdminNav/>}
    {/* <Nav/> */}
    <Outlet/>
    <Footer/>
    {/* {!hide && <Footer/>} */}
    </>
  )
}

export default Layout