<template>
    <div @click="$emit('task-state-changed', task)"
        class="task" :class="stateClass">
        <button @click.stop="$emit('task-edit', task)" class="alt"> Edit</button>
        <span @click.stop="$emit('task-deleted', task)" class="close">X</span>
        <p>{{task.name}}</p>
    </div>
</template>

<script>
export default {
    props: {
        task: {type: Object, required: true}
    },
    computed: {
        stateClass() {
            return{
            pending: this.task.pending,
            done: !this.task.pending
            }
        }
    }
}
</script>

<style>
    .task {
        position: relative;
        box-sizing: border-box;
        width: 200px;
        height: 130px;
        padding: 10px;
        border-radius: 8px;
        font-size: 1.5rem;
        font-weight: 300;
        cursor: pointer;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .pending {
        border-left: #B73229;
        background-color: #F44336;

    }

    .done {
        color: #DDD;
        border-left: 12px solid #0a8f08;
        background-color: #4caf50;
        text-decoration: line-through;
    }

    .pending .close {
        background-color: #f44336;
    }
    .pending .done {
        background-color: #0a8f08;
    }

    .close {
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 0.9rem;
        font-weight: 600;
        height: 20px;
        width: 20px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
    }
    .alt {
        position: absolute;
        right: 10px;
        bottom: 10px;
        background: #0aa;
        font-size: 1rem;
        display: flex;
        border-radius: 10px;
    }
</style>