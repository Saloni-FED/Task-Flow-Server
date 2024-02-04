import express from "express"
import {
 getAllBySpecificUserTask, updateBySpecificUserTask, deleteBySpecificUserTask, createBySpecificUserTask, getTaskBySpecificId
} from "../controllers/tasks.js";
const route = express.Router();

route.get("/getalltask",getAllBySpecificUserTask)
route.get("/:id",getTaskBySpecificId)
route.post("/createTask",createBySpecificUserTask)
route.put("/:id",updateBySpecificUserTask)
route.delete("/:id",deleteBySpecificUserTask)



export default route
