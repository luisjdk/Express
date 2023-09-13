const express = require("express");
const router = express.Router();

let tasks = [
  {
    id: "1",
    isCompleted: false,
    description: "pasear al perro",
  },
];

router.post("/tasks", (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.json(newTask);
});

router.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== id);
  res.json({ message: `Tarea ${id} eliminada` });
});

router.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const updatedTask = req.body;
  tasks = tasks.map((task) => (task.id === id ? updatedTask : task));
  res.json(updatedTask);
});

module.exports = router;
