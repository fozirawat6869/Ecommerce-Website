import jwt from "jsonwebtoken";

export default async function isAuthenticated(req, res, next) {
  
 try {  
           const token=req.headers.authorization?.split(" ")[1] // Bearer tokenValue
   

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
            
         

        req.user = decoded;
        next();
    }); 
}catch(err){
    console.error("Error in authentication middleware:", err);
    res.status(401).json({ message: "Internal Server Error" });
}       

}