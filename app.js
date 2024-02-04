import express from "express";
import dotenv from "dotenv";
import connect from "./db/connect.js";
import UsersRoutes from "./routes/users.js";
import TaskRoutes from "./routes/task.js";
import ProfileUpdate from "./routes/profile.js"
import auth from "./middleware/auth.js";
import cors from "cors";
// import { upload } from "./middleware/multer.js";
import History from "./routes/history.js"

dotenv.config();

const app = express();
// Enable cors
app.use(cors());

// Ale to send data in json format
app.use(express.json());

// For testing
app.get("/", (req, res) => {
  res.send("Server is started");
});

// Routes

app.use("/api/v1", UsersRoutes);
app.use("/api/v1", auth, TaskRoutes);
app.use("/api/v1", auth, ProfileUpdate)
app.use("/api/v1", auth, History)

// Small Mistake dont use semicolon while creating an environment variable
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connect(process.env.MONGODB_URI);
    app.listen(port, () => {
      console.log("app is listening at port " + port);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
