<template>
  <div id="app">
    <h1>Tarefas</h1>
    <TasksProgress :progress="progress" />
    <NewTask @taskAdded="addTask" />
    <TaskGrid
      :tasks="tarefas"
      @task-deleted="deleteTask"
      @task-state-changed="toggleTaskState"
      @task-edit="editTask"
    />
  </div>
</template>

<script>
import TasksProgress from "./components/TasksProgress.vue";
import TaskGrid from "./components/TaskGrid.vue";
import NewTask from "./components/NewTask.vue";

import Tarefa from "./services/tarefas";

export default {
  components: { TasksProgress, NewTask, TaskGrid },
  data() {
    return {
      tasks: [],
      tarefas: [],
    };
  },
  mounted() {
    this.loadTask();
  },
  computed: {
    progress() {
      const total = this.tasks.length;
      const done = this.tasks.filter((t) => !t.pending).length;
      return Math.round((done / total) * 100) || 0;
    },
  },
  watch: {
    tasks: {
      deep: true,
      handler() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
      },
    },
  },
  methods: {
    addTask(task) {
      const sameName = (t) => t.name === task.name;
      const reallyNew = this.tasks.filter(sameName).length == 0;
      if (reallyNew) {
        this.tasks.push({
          name: task.name,
          pending: task.pending || true,
        });
      }
    },
    async deleteTask(task) {
      if (confirm("Deseja excluir a tarefa?")) {
        await Tarefa.deleteTarefa(task.id);
        this.loadTask();
      }
    },

    async toggleTaskState(task) {
      await Tarefa.atualizarTarefa(task.id, {
        state: !task.state,
      });
      this.loadTask();
    },

    editTask(task) {
      const a = prompt("Qual o nome da nova tarefa");
      if (a.trim() && a.length > 0) {
        this.tarefas[task].name;
      } else {
        alert("A tarefa não foi editada pois o campo está vazio");
      }
    },
    loadTask() {
      Tarefa.listar().then((resposta) => {
        this.tarefas = resposta.data;
        window.console.log(resposta.data);
      });
    },
  },
  created() {
    const json = localStorage.getItem("tasks");
    const array = JSON.parse(json);
    this.tasks = Array.isArray(array) ? array : [];
  },
};
</script>

<style>
body {
  font-family: "Lato", sans-serif;
  background: linear-gradient(to right, rgb(22, 34, 42), rgb(58, 96, 115));
  color: #fff;
}

#app {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

#app h1 {
  margin-bottom: 5px;
  font-weight: 300;
  font-size: 2.5rem;
}
</style>
