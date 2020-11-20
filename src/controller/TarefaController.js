const Tarefa = require('../model/Tarefa')

module.exports = {

    async index (req,res) {
        const tarefas = await Tarefa.findAll();

        return res.json(tarefas);
    },

    async store (req, res) {
        const { name, state } = req.body;

        const tarefa = await Tarefa.create({ name, state});

        return res.json(tarefa);
    },

    async delete (req, res) {
        const { name } = req.body;

          if(!name) {
              return res.status(400).json({error: 'Tarefa Not Found'})
          }else{
        await Tarefa.destroy({
            where: {
              name: name
            }
          });
        }
        return res.json({ok: 'Sua deleção foi um sucesso'})
    },
    async update (req, res) {
        const { name } = req.body
        const { id } = req.params
        await Tarefa.update({name: name }, {
            where: {
              id:id
            }
          });

          return res.json(name)
    },
    async updateS (req, res) {
        const { state } = req.body
        const { id } = req.params
        await Tarefa.update({state: state}, {
            where: {
              id:id
            }
          });

          return res.json(state)
    }
}