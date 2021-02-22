const customerSchema = new mongoose.Schema({
  user_agent: {
    type    : String,
    required: true,
  },
})

const Customer = mongoose.model("Customer", cutomerSchema)

module.exports = Customer
