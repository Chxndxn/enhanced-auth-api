const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: Buffer, required: true, select: false },
	photo: { type: String },
	name: { type: String },
	bio: { type: String },
	phone: { type: String },
	publicProfile: { type: Boolean, default: true }, // true: 'public' or false: 'private'
	role: { type: String, default: "user" }, // 'user' or 'admin'
});

const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
