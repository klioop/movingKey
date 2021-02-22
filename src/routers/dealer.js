const express = require("express")
const router  = new express.Router()
const Dealer  = require("../models/dealer")
const auth    = require("../middleware/auth")

const { 
    signUpCallback, 
    logInCallback,
    profileCallback,
    logOutCallback
} = require("../controller/dealer")

router.post("/dealers", signUpCallback)

router.post("/dealers/login", logInCallback)

router.get("/dealers/me", auth, profileCallback)

router.post("/dealers/logout", auth, logOutCallback)


module.exports = router