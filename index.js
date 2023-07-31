const express = require("express");
const app = express();

const tasks = [
  {
    id: "1",
    isCompleted: false,
    description: "pasear al perro",
  },
];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
