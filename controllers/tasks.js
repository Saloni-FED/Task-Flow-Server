import Tasks from "../models/tasks.js";

// Get Task
export const getAllBySpecificUserTask = async (req, res) => {
  try {
    const { userId } = req.user;
    const { filter } = req.query;

    let query = { createdBy: userId };

    switch (filter) {
      case "All":
        const getUser = await Tasks.find(query);
        // console.log(getUser);
        res.status(200).json(getUser);
        break;
      case "low":
        const getUserLow = await Tasks.find({ ...query, priority: "low" });
        res.status(200).json(getUserLow);
        break;
      case "medium":
        const getUserMedium = await Tasks.find({
          ...query,
          priority: "medium",
        });
        res.status(200).json(getUserMedium);
        break;
      case "high":
        const getUserHigh = await Tasks.find({ ...query, priority: "high" });
        res.status(200).json(getUserHigh);
        break;
      case "completed":
        const getTaskCompleted = await Tasks.find({
          ...query,
          status: "completed",
        });
        res.status(200).json(getTaskCompleted);
        break;
      case "pending":
        const getTaskPending = await Tasks.find({
          ...query,
          status: "pending",
        });
        res.status(200).json(getTaskPending);
        break;

      case "new":
        const getLatestTask = await Tasks.find(query).sort({ createdAt: -1 });
        res.status(200).json(getLatestTask);
        break;
      case "old":
        const getOldTask = await Tasks.find(query).sort({ createdAt: 1 });
        res.status(200).json(getOldTask);
        break;
      default:
        res.status(200).json({ message: "No such Task present" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unauthorized user" });
  }
};

export const createBySpecificUserTask = async (req, res) => {
  // console.log(req.user.userId);
  try {
    console.log("Request Recieved", req.body);
    const { taskName, priority, dueDate } = req.body;
    const newTask = await Tasks.create({
      taskName,
      priority,
      dueDate,
      createdBy: req.user.userId,
    });
    // console.log(newTask)
    res.status(200).json({ message: "Task Created" });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Error creating task" });
  }
};

// Update Task
export const updateBySpecificUserTask = async (req, res) => {
  // console.log(req.params.id); // Log the request body
  // console.log(req.user.userId);
  const { taskName, priority, dueDate, status } = req.body;

  try {
    const taskId = req.params.id;
    const userAuthorized = req.user.userId;

    const updateTaskData = await Tasks.updateOne(
      { _id: taskId, createdBy: userAuthorized },
      { $set: { taskName, priority, dueDate, status } }
    );
    // console.log(updateTaskData);
    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Error updating task" });
  }
};

// Delete task
export const deleteBySpecificUserTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Tasks.findByIdAndDelete(taskId);
    if (task) {
      res
        .status(200)
        .json({ success: true, message: "Task deleted successfully" });
    } else {
      console.log("taskNotFound");
      res.status(404).json({ success: false, message: "Task Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const getTaskBySpecificId = async (req, res) => {
  try {
    const taskId = req.path.slice(1);
    const taskById = await Tasks.findById({ _id: taskId });
    res.status(200).json({ success: true, data: taskById });
  } catch (error) {
    console.log(error);
  }
};
