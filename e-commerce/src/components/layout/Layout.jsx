import { Outlet, useLocation } from "react-router-dom";
import Nav from "../nav/nav";
import Footer from "../footer/Footer";
import { jwtDecode } from "jwt-decode";
import AdminNav from "../nav/AdminNav";




function Layout(){


const token = localStorage.getItem("token");
console.log("Token in Layout:", token);

  let role = null;



  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      role = decodedToken.role;
      console.log(role)
    } catch (err) {
      console.log("Error decoding token admin:", err);
      console.log("Invalid token");
      return
    }
  }

  

  return(
    <>
    {/* {!hide && <Nav/>} */}
    {role==="admin" && <AdminNav/>}
    {role==="user" && <Nav/>}
    {!role && <Nav/>}
    {/* <Nav/> */}
    <Outlet/>
    <Footer/>
    {/* {!hide && <Footer/>} */}
    </>
  )
}

export default Layout

