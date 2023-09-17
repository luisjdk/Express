const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router");

app.use(bodyParser.json());

function validateTask(req, res, next) {
  const task = req.body;
  if (!task || !task.id || !task.description) {
    return res.status(400).json({
      error:
        "Información no válida o atributos faltantes para crear las tareas",
    });
  }
  next();
}

app.use((req, res, next) => {
  const validMethods = ["GET", "POST", "PUT", "DELETE"];
  if (!validMethods.includes(req.method)) {
    return res.status(400).json({ error: "Método HTTP no válido" });
  }
  next();
});

app.use("/list-view", listViewRouter);
app.use("/list-edit", validateTask, listEditRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
