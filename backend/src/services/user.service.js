import UserModel from "../models/user.model.js";

const createUser = async (userInfo) => {
  const duplicate = await UserModel.findOne({ username: userInfo.username })
    .collation({ locale: "en", strength: 2 })
    // .lean()
    .exec();

  if (duplicate) {
    return null;
  }

  const newUser = await UserModel.create(userInfo);
  return newUser;
};

const validatePassword = async (username, password) => {
  const user = await UserModel.findOne({ username }).exec();

  if (!user) {
    return false;
  }

  const isValidPwd = user.comparePassword(password);

  if (!isValidPwd) {
    return false;
  }
};

export { validatePassword, createUser };
