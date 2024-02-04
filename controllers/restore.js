import Tasks from "../models/tasks.js";
import DeletedHistory from "../models/delete.js";

export const restore = async (req, res) => {
    try {
        const { taskId } = req.body;
    
        const deletedTask = await DeletedHistory.findOneAndDelete({ taskId });
    
        if (deletedTask) {
          const dueDate = new Date()
         const { taskName, priority, status } = deletedTask;
    
          await Tasks.create({
            taskName,
            priority,
            dueDate,
            status,
            dueDate,
            createdBy: req.user.userId,
          });
    
          res.status(200).json({ success: true, message: "Task restored successfully" });
        } else {
          res.status(404).json({ success: false, message: "Task not found in trash bin" });
        }
      } catch (error) {
        console.error("Error while restoring task:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
      }
};
