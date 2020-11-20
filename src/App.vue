<template>
	<div id="app">
		<h1>Tarefas</h1>
		<TasksProgress :progress="progress" />
		<NewTask @taskAdded="addTask" />
		<TaskGrid :tasks="tasks" 
		@task-deleted="deleteTask" @task-state-changed="toggleTaskState" @task-edit="editTask" />
	</div>
</template>

<script>
import TasksProgress from './components/TasksProgress.vue'
import TaskGrid from './components/TaskGrid.vue'
import NewTask from './components/NewTask.vue'

import Tarefa from './services/tarefas'

export default {
	components: {TasksProgress, NewTask, TaskGrid},
	data() {
		return {
			tasks: [],
			tarefas: []
		}
	},
	mounted (){
		Tarefa.listar().then(resposta => {
			console.log(resposta)
			this.tarefas = resposta.data
			//v-for="tarefa of tarefas" :key="tarefa.id"
		})
	},
	computed: {
		progress() {
			const total = this.tasks.length
			const done = this.tasks.filter(t => !t.pending).length
			return Math.round(done / total 	* 100) || 0
		}
	},
	watch: {
		tasks: {
			deep: true,
			handler () {
			localStorage.setItem('tasks', JSON.stringify(this.tasks))
			}
		}
	},
	methods: {
		addTask(task) {
			const sameName = t => t.name ===task.name
			const reallyNew = this.tasks.filter(sameName).length == 0
			if (reallyNew) {
				this.tasks.push({
					name: task.name,
					pending: task.pending || true
				})
			}
		},
		deleteTask (i) {
			if(confirm('Deseja excluir a tarefa?')) {
			this.tasks.splice(i, 1)
			}
		},
		toggleTaskState(i) {
			this.tasks[i].pending = !this.tasks[i].pending
		},
		editTask (i){
			const a = prompt('Qual o nome da nova tarefa')
			if(a.trim() && a.length > 0){
			this.tasks[i].name
			}else {
				alert('A tarefa não foi editada pois o campo está vazio')
			}
		}
	},
		created () {
			const json = localStorage.getItem('tasks')
			const array = JSON.parse(json)
			this.tasks = Array.isArray(array) ? array : []
		}
	}

</script>

<style>
	body {
		font-family: 'Lato', sans-serif;
		background: linear-gradient(to right, rgb(22, 34, 42), rgb(58, 96, 115));
		color: #FFF;
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
