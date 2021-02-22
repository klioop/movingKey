const dealerSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  push_token: {
    type: String,
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
})

const Dealer = mongoose.model("Dealer", dealerSchema)

module.exports = Dealer
