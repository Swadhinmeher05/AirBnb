const express=require("express");
const router=express.Router({ mergeParams: true });
const wrapAsync=require("../utils/warapAsync.js");

const { validateReview, isLoggedIn ,isReviewAuthor }=require("../middleware.js");

const reviewControllers=require("../controlers/review.js");

router.post("/",isLoggedIn, validateReview,wrapAsync(reviewControllers.createReview));

// review delete rout
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewControllers.destroyReview));

module.exports=router;