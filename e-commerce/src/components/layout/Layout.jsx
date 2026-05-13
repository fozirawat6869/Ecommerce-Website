import { Outlet } from "react-router-dom";
import Nav from "../nav/nav";
import Footer from "../footer/Footer";
import { jwtDecode } from "jwt-decode";
import AdminNav from "../nav/AdminNav";
import { useEffect, useState } from "react";

function Layout() {

  const [token, setToken] = useState(localStorage.getItem("token"));

  let role = null;

  useEffect(() => {

    const checkToken = () => {

      setToken(localStorage.getItem("token"));
    };

    checkToken();

    window.addEventListener("storage", checkToken);

    return () => {

      window.removeEventListener("storage", checkToken);
    };

  }, []);

  if (token) {

    try {

      const decodedToken = jwtDecode(token);

      role = decodedToken.role;

      console.log(role);

    } catch (err) {

      console.log("Invalid token",err);

      return null;
    }
  }

  return (
    <>

      {role === "admin" && <AdminNav />}

      {role === "user" && <Nav />}

      {!role && <Nav />}

      <Outlet />

      <Footer />

    </>
  );
}

export default Layout;