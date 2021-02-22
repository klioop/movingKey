const jwt    = require("jsonwebtoken")
const Dealer = require("../models/dealer")

const auth = async (req, res, next) => {
    try {
    const token   = req.header("Authorization").replace("Bearer ", "")
    const decoded = jwt.verify(token, "secret")
    const dealer  = await Dealer.findOne( { _id: decoded._id, authToken: token })

    if (!dealer) throw new Error()

    req.token  = token
    req.dealer = dealer
    next()

    } catch(e) {
        res.send(401).send({ error: "Please Authenticate" })
    }
}

module.exports = auth