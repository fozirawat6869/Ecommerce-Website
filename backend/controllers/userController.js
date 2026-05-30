
import HandleError from '../utils/handleErrors.js'
import connection from '../config/sqldb.js'
import dotenv from 'dotenv';
import axios from 'axios';



dotenv.config({ path: './config/config.env' });




// user profile 

export const userProfile=(req,res,next)=>{

const mobile=req.user.mobile;

connection.query(`select * from users where mobile=?`,[mobile],(err,result)=>{

  if(err){
    console.log("err in user profile query",err)
    return next(new HandleError("DB error",500))
    // res.status(500).json({ success: false, message: "DB error" });
  }
  console.log("user profile query result",result)
  res.status(200).json({
    success:true,
    user:result[0]
  })
})
}



// update the profile

export const updateUserProfile = (req, res, next) => {

  console.log("update user profile api", req.body);

  const { first_name, last_name, email } = req.body;
  const mobile = req.user.mobile;

  connection.query(
    "UPDATE users SET first_name=?, last_name=?, email=? WHERE mobile=?",
    [first_name, last_name, email, mobile],
    (err, result) => {

      if (err) {
        console.log("err in update user profile query", err);

        return next(
          new HandleError(
            "Database error while updating profile",
            500
          )
        );
      }

      connection.query(
        "SELECT * FROM users WHERE mobile=?",
        [mobile],
        (err, userdata) => {

          if (err) {
            console.log(
              "err in user profile query after update",
              err
            );

            return next(
              new HandleError(
                "Database error while fetching updated user",
                500
              )
            );
          }

          if (userdata.length === 0) {
            return next(
              new HandleError(
                "User not found",
                404
              )
            );
          }

          console.log(
            "user profile query result after update",
            userdata
          );

          res.status(200).json({
            success: true,
            message: "User profile updated successfully",
            data: userdata[0]
          });
        }
      );
    }
  );
};


// re update

  export const reUpdateProfile=(req,res,next)=>{
     console.log("reUpdate data",req.body)
     console.log("authenticate profile", req.user)
     const {first_name,last_name,email}=req.body
     let userMobile=req.user.mobile
     let query="update users set "
     let values=[]
      
     if(first_name){
       query +=`first_name=?, `
       values.push(first_name)
     }
     if(last_name){
      query += `last_name=?, `
      values.push(last_name)
     }
     if(email){
      query += "email = ?, "
      values.push(email)
     }
    
     
 // remove last comma
  query = query.slice(0, -2)

      query += ` where mobile=?`
       values.push(userMobile)

       console.log("final query",query)
       console.log("final values",values)
     connection.query(query,values,(err,result)=>{
      if(err){
        console.log("err in backend with query", err)
        return next(new HandleError("failed re update the profile",500))
      }
      console.log("reupdata the result",result)
      res.status(201).json({
        success:true,
        message:"re update user profile successfuly",
        data:result,

      })
     })
  }



  
// get all users

export const allUsers=(req,res,next)=>{

  console.log("all users api", req.query);


  let page = parseInt(req.query.page) || 1;   // if no page given, use 1
  let limit = parseInt(req.query.limit) || 10;

  let offset = (page - 1) * limit;
 
  connection.query(`select * from users limit ? offset ?`,[limit,offset],(err,result)=>{
    if(err){
      console.log("Error while querying all users", err);
      return next(new HandleError("DB error",500))
      
    }

    res.status(200).json({
      success:true,
      users:result
    })
  })
}



// get user address query

export const getAddress = (req, res, next) => {

  const { mobile } = req.user;

  connection.query(
    "select * from users where mobile=?",
    [mobile],
    (err, result) => {

      if (err) {
        return next(
          new HandleError(
            "Error while finding user",
            500
          )
        );
      }

      if (result.length === 0) {
        return next(
          new HandleError(
            "User not found",
            404
          )
        );
      }

      console.log("user result", result);

      const userId = result[0].id;

      connection.query(
        "select * from address where user_id=?",
        [userId],
        (err, address) => {

          console.log("user address :", address);

          if (err) {
            return next(
              new HandleError(
                "Error while fetching address",
                500
              )
            );
          }

          res.status(200).json({
            success: true,
            message: "get address successfully",
            userAddress: address
          });
        }
      );
    }
  );
};



// add address
export const addAddress = (req, res, next) => {

  console.log("inside the add address api");
  console.log(req.body);

  const { full_name, phone_no, pincode, state, city, addres } = req.body;

  const phoneNumber = Number(phone_no);
  const pinCode = Number(pincode);

  console.log(full_name, state, phone_no);

  const { mobile } = req.user;

  connection.query(
    "select * from users where mobile=?",
    [mobile],
    (err, result) => {

      if (err) {
        return next(
          new HandleError(
            "Error while finding user",
            500
          )
        );
      }

      if (result.length === 0) {
        return next(
          new HandleError(
            "User not found",
            404
          )
        );
      }

      const userId = result[0].id;

      connection.query(
        `insert into address (user_id,full_name,mobile,pincode,state,city,addres) values(?,?,?,?,?,?,?)`,
        [
          userId,
          full_name,
          phoneNumber,
          pinCode,
          state,
          city,
          addres
        ],
        (err, addressResult) => {

          console.log("address inserted");

          if (err) {
            return next(
              new HandleError(
                "Error in inserting the address",
                500
              )
            );
          }

          res.status(200).json({
            success: true,
            message: "address inserted successfully",
            address: addressResult
          });
        }
      );
    }
  );
};