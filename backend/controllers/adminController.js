import connection from "../config/sqldb.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import HandleError from "../utils/handleErrors.js";

// admin login with email and password

export const adminLogin = (req, res, next) => {

  console.log("admin login api", req.body);

  const { email, password } = req.body;

  // bcrypt.hash(password,10,(err,hash)=>{
  //   if(err){
  //     console.log("Error while hashing password", err);

  //     return next(
  //       new HandleError(
  //         "Error while hashing password",
  //         500
  //       )
  //     );
  //   }

  //   console.log("Hashed password:", hash);

  // })

  connection.query(
    `select * from admin where email=?`,
    [email],
    (err, result) => {

      if (err) {
        console.log("Error while querying admin", err);

        return next(
          new HandleError(
            "DB error",
            500
          )
        );
      }

      if (result.length === 0) {
        return next(
          new HandleError(
            "Wrong email",
            400
          )
        );
      }

      console.log("Admin query result", result);

      const hash = result[0].password;

      // compare password with hash password using bcrypt
      bcrypt.compare(
        password,
        hash,
        (err, result) => {

          if (err) {
            console.log("Error while comparing password", err);

            return next(
              new HandleError(
                "Error while comparing password",
                500
              )
            );
          }

          console.log("Password comparison result:", result);

          if (result === true) {

            const token = jwt.sign(
              {
                email: email,
                role: "admin"
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "7d"
              }
            );

            res.status(200).json({
              success: true,
              message: "Admin logged in successfully",
              token: token
            });

          } else {

            return next(
              new HandleError(
                "Wrong password",
                400
              )
            );
          }
        }
      );
    }
  );
};




// delete product by admin

export const deleteProduct=(req,res,next)=>{
  console.log("Delete product api called", req.params);
  const {id}=req.params;
  console.log("Delete product id", id);

  if(!id){
    return next(new HandleError("Product id is required",400))
    // res.status(400).json({
    //   success:false,
    //   message:"Product id is required"
    // })


  }


  connection.query(`delete from product where product_id=?`,[id],(err,result)=>{
    console.log("Delete product result", result);
    if(err){
      console.log("Error while deleting product", err);
      return next(new HandleError("DB error",500))
      // res.status(500).json({ success: false, message: "DB error" });
    }
    res.status(200).json({
      success:true,
      message:"Product deleted successfully",
      removedProduct:result
    })
  })
}

