// Deleted History
import express from "express";
import { createDeletedHistory, getAllDeletedHistory } from "../controllers/deletetask.js";
import { restore } from "../controllers/restore.js";

const route = express.Router();

// Creations
route.post("/create/history", createDeletedHistory);

// Route for getting all deleted history
route.get("/get/history", getAllDeletedHistory);

// Restore
route.post('/data/restore',restore)

export default route;
