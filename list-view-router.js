const express = require("express");
const router = express.Router();

const tasks = [
  {
    id: "1",
    isCompleted: false,
    description: "pasear al perro",
  },
];

function validateParams(req, res, next) {
  const { id } = req.params;
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Parámetros incorrectos" });
  }
  next();
}

router.get("/tasks/completed", (req, res) => {
  const completedTasks = tasks.filter((task) => task.isCompleted);
  res.json(completedTasks);
});

router.get("/tasks/incomplete", (req, res) => {
  const incompleteTasks = tasks.filter((task) => !task.isCompleted);
  res.json(incompleteTasks);
});

module.exports = router;
