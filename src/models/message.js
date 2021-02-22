const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    room_id: {
      type    : mongoose.Schema.Types.ObjectId,
      required: true,
      ref     : "Room",
    },
    is_dealer: {
      type    : Bool,
      required: true,
    },
    date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
