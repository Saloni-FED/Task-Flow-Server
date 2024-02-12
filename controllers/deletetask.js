// controllers/deletedHistory.js
import DeletedHistory from "../models/delete.js";

export const createDeletedHistory = async (req, res) => {
  const { taskName , _id, dueDate, priority, status} = req.body
  try {
    
    const history = await DeletedHistory.create({userId: req.user.userId,  taskId: _id, taskName, dueDate, priority, status})
    res.send("deleted stored")
    console.log(history)
    
  } catch (error) {
    console.error("Error creating deleted history:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllDeletedHistory = async (req, res) => {
  const userId = req.user.userId;
  try {
    const deletedHistory = await DeletedHistory.find({ userId : userId});
    res.status(200).json(deletedHistory);
  } catch (error) {
    console.error("Error fetching deleted history:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
