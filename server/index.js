import express from "express";
import { connectDB } from "./mongodb/connection.js";
import * as dotenv from "dotenv";
import cors from "cors";
import router from "./routes/routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

app.use("/", router);
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from CRUD!",
  });
});
const PORT = 8000;
(async () => {
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
})();
