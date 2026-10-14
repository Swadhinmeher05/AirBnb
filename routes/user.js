const express=require("express");
const router=express.Router();
const warapAsync = require("../utils/warapAsync.js");
const passport=require("passport");

const{ saveRedirectUrl}=require("../middleware.js");
const userController = require("../controlers/user.js");
const { route } = require("./listing.js");

router
    .route("/signup")
    .get(userController.renderSignupFrom)
    .post(warapAsync(userController.signup));
    
router
    .route("/login")
    .get(userController.renderLoginFrom)
    .post(saveRedirectUrl,passport.authenticate('local', 
    { failureRedirect: '/login', failureFlash:true }),
    userController.login 
);

router.get("/logout",userController.logout);

module.exports=router;