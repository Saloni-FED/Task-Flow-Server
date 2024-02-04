// models/DeletedHistory.js
import mongoose from "mongoose";

const DeletedHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
  taskName: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  deletionTimestamp: { type: Date, default: Date.now },
});

const DeletedHistory = mongoose.model("DeletedHistory", DeletedHistorySchema);
export default DeletedHistory;
