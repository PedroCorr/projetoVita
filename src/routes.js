const express = require("express");
const TarefaController = require("./controller/TarefaController");

const routes = express.Router();

routes.get("/tarefas", TarefaController.index);
routes.post("/tarefas", TarefaController.store);
routes.delete("/tarefas", TarefaController.delete);
routes.put("/tarefas/:id", TarefaController.update);

module.exports = routes;
