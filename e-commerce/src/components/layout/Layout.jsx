import { Outlet, useLocation } from "react-router-dom";
import Nav from "../nav/nav";
import Footer from "../footer/Footer";
import { jwtDecode } from "jwt-decode";
import AdminNav from "../nav/AdminNav";




function Layout(){

const token = localStorage.getItem("token");

  let role = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      role = decodedToken.role;
    } catch (err) {
      console.log("Error decoding token:", err);
      console.log("Invalid token");
      role = null;
    }
  }
  return(
    <>
    {/* {!hide && <Nav/>} */}
    {role=="admin"?<AdminNav/>:<Nav/>}
    {/* <Nav/> */}
    <Outlet/>
    <Footer/>
    {/* {!hide && <Footer/>} */}
    </>
  )
}

export default Layout