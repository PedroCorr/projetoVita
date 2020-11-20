<template>
  <div class="task-grid">
    <template v-if="tasks.length">
      <Task
        v-for="task in tasks"
        :key="task.name"
        @task-deleted="emitTaskDeleted(task)"
        @task-state-changed="emitTaskChanged(task)"
        @task-edit="emitTaskEdit(task)"
        :task="task"
      ></Task>
    </template>
    <p v-else class="no-task">Não Há nenhuma tarefa à fazer</p>
  </div>
</template>

<script>
import Task from "./Task.vue";
export default {
  components: { Task },
  props: {
    tasks: { type: Array, required: true },
  },
  methods: {
    emitTaskDeleted(task) {
      this.$emit("task-deleted", task);
    },
    emitTaskChanged(task) {
      this.$emit("task-state-changed", task);
    },
    emitTaskEdit(task) {
      this.$emit("task-edit", task);
    },
  },
};
</script>

<style scoped>
.task-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.task-grid .task {
  margin: 10px;
}
.no-task {
  color: #aaa;
  font-size: 1.8rem;
}
</style>
