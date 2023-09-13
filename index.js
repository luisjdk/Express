const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// Enrutadores
const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router");

app.use(bodyParser.json());

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

// Usar los enrutadores
app.use("/list-view", listViewRouter);
app.use("/list-edit", listEditRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
