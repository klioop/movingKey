const mongoose = require("mongoose")

const linkSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  page_info: {},
  animation: {},
  dealer_id: {
    type    : mongoose.Schema.Types.ObjectId,
    required: true,
    ref     : "Dealer",
  },
  content: {},
});

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;
