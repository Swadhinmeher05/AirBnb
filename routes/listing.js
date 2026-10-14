const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/warapAsync.js");
const Listing=require("../models/listing.js");
const { isLoggedIn,isOwner, validateListing }=require("../middleware.js"); 
const listingControlers = require("../controlers/listing.js");
const multer  = require('multer')
const {storage}=require("../cloudconfig.js");
const upload = multer({ storage });

router
    .route("/")
    .get(wrapAsync(listingControlers.index))
    .post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingControlers.createListing));

//new routs
router.get("/newListing",isLoggedIn,listingControlers.renderNewFrom);

router
    .route("/:id")
    .get(wrapAsync(listingControlers.showListing))
    .put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingControlers.updateListing))
    .delete(isLoggedIn,isOwner,wrapAsync(listingControlers.destroyListing));

// edit
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingControlers.renderEditFrom));

module.exports=router;
