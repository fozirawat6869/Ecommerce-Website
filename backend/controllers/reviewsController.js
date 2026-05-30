

import connection from "../config/sqldb.js";
import HandleError from "../utils/handleErrors.js";



  // Reviews and Ratings 

export const reviews = async (req, res,next) => {

  console.log("review api called", req.body);
  console.log("authenticated user in review api", req.user);

  const { productId, rating, review } = req.body;
  const userMobile = req.user.mobile;

  if (!productId) {
    return next(new HandleError("Product id is required",400))
  }

  // 1. Get user id using mobile
  connection.query(
    `SELECT id FROM users WHERE mobile = ?`,
    [userMobile],
    (err, userResult) => {

      if (err) {
        console.log("Error while getting user id", err);
        return next(new HandleError("DB error",500))
      }

      if (userResult.length === 0) {
        return next(new HandleError("No user found for this user",400))
      }

      const user_id = userResult[0].id;

      // 2. Check if review already exists
      connection.query(
        `SELECT id FROM reviews WHERE product_id = ? AND user_id = ?`,
        [productId, user_id],
        (err, reviewResult) => {

          if (err) {
            console.log("Error while checking existing review", err);
            return next(
              new HandleError(
                "Error while checking existing review",
                500
              )
            );
          }

          console.log("review query result", reviewResult);

          // ================= UPDATE =================
          if (reviewResult.length > 0) {

            // Update review text only
            if (rating === "") {

              connection.query(
                `UPDATE reviews 
                 SET review_text = ? 
                 WHERE product_id = ? AND user_id = ?`,
                [review, productId, user_id],
                (err, updateResult) => {

                  if (err) {
                    console.log("Error while updating review", err);

                    return next(
                      new HandleError(
                        "Error while updating review",
                        500
                      )
                    );
                  }

                  console.log("update result", updateResult);

                  return res.status(201).json({
                    success: true,
                    message: "Review updated successfully",
                    data: updateResult
                  });
                }
              );

              return;

            } else {

              // Update rating only
              connection.query(
                `UPDATE reviews 
                 SET rating = ? 
                 WHERE product_id = ? AND user_id = ?`,
                [rating, productId, user_id],
                (err, updateResult) => {

                  if (err) {
                    console.log("Error while updating rating", err);

                    return next(
                      new HandleError(
                        "Error while updating rating",
                        500
                      )
                    );
                  }

                  console.log("update result", updateResult);

                  return res.status(201).json({
                    success: true,
                    message: "Rating updated successfully",
                    data: updateResult
                  });
                }
              );

              return;
            }
          }

          // ================= INSERT =================
          if (rating === "") {

            // Insert review only
            connection.query(
              `INSERT INTO reviews (product_id, user_id, review_text) 
               VALUES (?, ?, ?)`,
              [productId, user_id, review],
              (err, insertResultReview) => {

                if (err) {
                  console.log("Error while inserting review", err);

                  return next(
                    new HandleError(
                      "DB error while saving review",
                      500
                    )
                  );
                }

                console.log("insert review result", insertResultReview);

                return res.status(201).json({
                  success: true,
                  message: "Review submitted successfully",
                  data: insertResultReview
                });
              }
            );

            return;

          } else {

            // Insert rating only
            connection.query(
              `INSERT INTO reviews (product_id, user_id, rating) 
               VALUES (?, ?, ?)`,
              [productId, user_id, rating],
              (err, insertResultRating) => {

                if (err) {
                  console.log("Error while inserting rating", err);

                  return next(
                    new HandleError(
                      "DB error while saving rating",
                      500
                    )
                  );
                }

                console.log("insert rating result", insertResultRating);

                return res.status(201).json({
                  success: true,
                  message: "Rating submitted successfully",
                  data: insertResultRating
                });
              }
            );
          }

        }
      );

    }
  );
};


