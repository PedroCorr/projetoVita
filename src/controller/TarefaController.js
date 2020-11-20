const Tarefa = require("../model/Tarefa");

module.exports = {
  async index(req, res) {
    const tarefas = await Tarefa.findAll();

    return res.json(tarefas);
  },

  async store(req, res) {
    const { name, state } = req.body;

    const tarefa = await Tarefa.create({ name, state });

    return res.json(tarefa);
  },

  async delete(req, res) {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Invalid ID " });
    } else {
      const tarefa = await Tarefa.findByPk(id);
      if (!tarefa) {
        return res.status(404).json({ error: "Tarefa Not Found" });
      }
      await tarefa.destroy();
    }
    return res.json({ ok: "Sua deleção foi um sucesso" });
  },
  async update(req, res) {
    const  data  = req.body;
    const { id } = req.params;
    
    const tarefa = await Tarefa.findByPk(id);
      if (!tarefa) {
        return res.status(404).json({ error: "Tarefa Not Found" });
      }
      const tarefaUpdated = await tarefa.update(data)

      return res.json(tarefaUpdated)
  },
};
