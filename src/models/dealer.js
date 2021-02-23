const mongoose  = require("mongoose")
const validator = require("validator")
const jwt       = require("jsonwebtoken")
const bcrypt    = require("bcryptjs")

const dealerSchema = new mongoose.Schema({
  email: {
    type     : String,
    unique   : true,
    trim     : true,
    required : true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Invalid Email")
    }
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  name: {
    type: String,
    trim: true,
  },
  company: {
    type: String,
    trim: true,
    default: "BMW",
  },
  push_token: [{
    type    : String,
    required: true,
  }],
  authToken :  {
      type    : String,
    }
})

dealerSchema.virtual("links", {
  ref         : "Link",
  localField  : "_id",
  foreignField: "dealer_id"
})

dealerSchema.methods.toJSON = function () {
  const dealer       = this
  const dealerObject = dealer.toObject()

  delete dealerObject.password
  delete dealerObject.authToken

  return dealerObject
}

dealerSchema.methods.generateAuthToken = async function () {
  const dealer = this
  console.log("fdafs", dealer)
  const token  = jwt.sign({ _id: dealer._id.toString() }, "secret", { expiresIn : "7 days"} )

  dealer.authToken = token
  await dealer.save()

  return token
}

dealerSchema.statics.findByCredentials = async (email, password) => {
  const dealer = await Dealer.findOne({ email })
  if (!dealer) throw new Error("Invalid Email")

  const isMatch = await bcrypt.compare(password, dealer.password)
  
  if (!isMatch) throw new Error ("Invalid password")
  return dealer
}


dealerSchema.pre("save", async function(next) {
  const dealer = this 

  if (dealer.isModified("password")) {
    dealer.password = await bcrypt.hash(dealer.password, 8)
  }

  next()
})

const Dealer = mongoose.model("Dealer", dealerSchema)

module.exports = Dealer
