const express = require("express")
const router  = new express.Router()
const auth    = require("../middleware/auth")
const Room = require("../models/room")
const Link = require("../models/link")

const { 
    signUpCallback, 
    logInCallback,
    profileCallback,
    logOutCallback,
    linksCallback,
} = require("../controller/dealer")

router.post("/dealers", signUpCallback)

router.post("/dealers/login", logInCallback)

router.get("/dealers/me", auth, profileCallback)

router.post("/dealers/logout", auth, logOutCallback)

router.post("/dealers/links", auth, linksCallback)

router.get("/dealers/rooms", auth, async (req, res) => {
    const sort = {}

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(":")
        sort[parts[0]] = parts[1] === "desc" ? -1 : 1
    }
    
    const link = Link.findOne({ dealer_id: req.dealer._id })
    // list of rooms of a certain link

    try {
    if (!link) throw new Error("First Create a Link!")

    const rooms = Room.find( { link_id : link._id }).sort({ sort })
    .limit(parseInt(req.query.limit)).skip(parseInt(req.query.skip))

    res.send({ link, rooms })
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router