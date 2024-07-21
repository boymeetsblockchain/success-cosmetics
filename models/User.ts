import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already exists'],
      required: [true, 'Email is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    password:{
      type: String,
      required: [true, 'Password is Required'],
    },
    image: {
      type: String,
    },
    wishlists: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
  }
);

 const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;