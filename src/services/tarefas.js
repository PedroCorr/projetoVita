import { http } from "./config";

export default {
    createTarefa: () => {
        return http.post("tarefas")
    },

  listar: () => {
    return http.get("tarefas");
  },

  deleteTarefa: (id) => {
      return http.delete("tarefas", {
          data: {
              id
          }
      })
  },
  atualizarTarefa: (id, dados) => {
      return http.put(`/tarefas/${id}`, {
          dados
      })
  }
};
