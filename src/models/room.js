const mongoose = require("mongoose")

const roomSchema = new mongoose.Schema({
  link_id: {
    type    : mongoose.Schema.Types.ObjectId,
    required: true,
    ref     : "Link",
  },
  customer_id: {
    type    : mongoose.Schema.Types.ObjectId,
    ref     : "Customer",
  },
  last_message_content: {},
  last_message_date   : {
    type: Date,
  },
}, {
  timestamps: true
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
