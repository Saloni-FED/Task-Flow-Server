import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  status: {
    type:String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  taskName: {
    required: true,
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default:"medium"
  },
});

const Tasks = mongoose.model("Task", TaskSchema);

export default Tasks;
