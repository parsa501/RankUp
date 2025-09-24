import mongoose from "mongoose";

const gameMetadataSchema = new mongoose.Schema({
  modes: [{ type: String }],
  maxPlayers: { type: Number, default: 1 },
  timeLimitSec: { type: Number, default: 0 },
  iconUrl: { type: String, default: "" }
}, { _id: false });

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Game name is required"],
    trim: true,
    maxlength: [128, "Game name too long"]
  },
  slug: {
    type: String,
    unique: [true, "Slug must be unique"],
    index: true
  },
  description: {
    type: String,
    default: ""
  },
  metadata: {
    type: gameMetadataSchema,
    default: {}
  },
  isPublish: {
    type: Boolean,
    default: true,
    index: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
    index: true
  }
}, { timestamps: true });

const Game = mongoose.model("Game", gameSchema);
export default Game;
