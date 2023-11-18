import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  //remove additionla outer arr - from [[ to [
  orders: [
    {
      //either now() or now works, unlike in checkout-route where only now() workds
      orderDate: { type: Date, default: Date.now() },
      orderItems: [
        {
          productID: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
          count: { type: Number },
        },
      ],

      orderTotal: { type: Number },
    },
  ],
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
  
});
UserSchema.methods.comparePassword = async function (inputPassword) {
  const isValid = await bcrypt.compare(inputPassword, this.password);

  return isValid;
};
const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
