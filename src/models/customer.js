const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
  user_agent: {
    type    : String,
    required: true,
  },
})

const Customer = mongoose.model("Customer", customerSchema)

module.exports = Customer
