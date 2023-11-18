import dotenv from "dotenv";
import connectDB from "./utils/connectDB.js";
import createServer from "./utils/server.js";

dotenv.config();

const app = createServer();

const PORT = process.env.PORT || 5005;

connectDB();

app.listen(PORT, () => {
  console.log("Server started on 5005 wiht type set to module");
});
