const roomSchema = new mongoose.Schema({
  link_id: {
    type: mongoose.Schema.Types.ObjectId,
    requied: true,
    ref: "Link",
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Customer",
  },
  last_message_content: {},
  last_message_date: {
    type: Date,
  },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
