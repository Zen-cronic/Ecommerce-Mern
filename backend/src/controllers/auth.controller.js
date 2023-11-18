import { signJWT } from "../utils/jwt.utils.js";
import { createUser, validatePassword } from "../services/user.service.js";

const registerUserHandler = async (req, res) => {

  const newUser = await createUser(req.body);

  if (!newUser) {
    return res
      .status(409)
      .json({
        message: "Error with creating user, possible duplicate username",
      });
  }

  return res
    .status(200)
    .json({ message: `${newUser.username} is registered successfully`, newUser });
};

const loginUserHandler = async (req, res) => {
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const accessToken = signJWT({ id: user._id }, process.env.accessTokenSecret, {
    expiresIn: "15s",
  });

  const refreshToken = signJWT(
    { id: user._id },
    process.env.refreshTokenSecret,
    {
      expiresIn: "1h",
    }
  );

  res.cookie("jwt", refreshToken);

  return res.status(200).json({ accessToken });
};

export { registerUserHandler, loginUserHandler };
