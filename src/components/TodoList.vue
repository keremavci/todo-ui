<template>
  <div class="hello" style="display: flex; flex-direction: column; justify-content: center; align-items: center">
    <h1>{{ msg }}</h1>
    <div style="display: flex; flex-direction: row; justify-content: center; align-items: center">
      <div style="width: 400px">
    <md-field>
      <label>TODO</label>
      <md-input id="todoInput" v-model="newTodo"></md-input>
    </md-field>
    </div>
    <div>
    <md-button id="addButton" class="md-raised md-primary" @click="addTodo()">ADD</md-button>
    </div>
    </div>
    <div style="width:500px">
    <md-list id="toDoList">
      <md-list-item v-for="todo in todos" :key="todo.id">
        <span
          class="md-list-item-text cursor"
          v-bind:class="{ active: !todo.active }"
          v-on:click="updateTodo(todo)"
          :title="todo.message"
          >{{ todo.text }}</span
        >
        <md-button class="md-icon-button md-raised" @click="removeTodo(todo)">
        <md-icon>delete</md-icon>
      </md-button>
      </md-list-item>
    </md-list>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "TodoList",
  
  props: {
    msg: String,
    list: Array,
  },
  data: function () {
    return {
      todos: [],
      newTodo: "",
      todoAPIEndpoint: "http://localhost:8080/api/todo"

    };
  },
  mounted() {
    axios.get(this.todoAPIEndpoint).then(response => {this.todos=response.data})
  },
  methods: {
    addTodo: function () {
      if(this.newTodo.length > 0) {
        axios.post(this.todoAPIEndpoint, {text: this.newTodo, active:true}).then(
          () => axios.get(this.todoAPIEndpoint).then(response => this.todos=response.data)
          );
      }
      this.newTodo="";
    },
    removeTodo: function (todo) {
      axios.get(this.todoAPIEndpoint).then(response => response.data.forEach(element => {
        if(element.id == todo.id) {
          axios.delete(this.todoAPIEndpoint + "/" + element.id).then(()=> axios.get(this.todoAPIEndpoint).then(response => this.todos=response.data))
        }
      }))
      this.todos.splice(this.todos.indexOf(todo), 1)
    },
    updateTodo: function (todo) {
      todo.active = !todo.active
      axios.get(this.todoAPIEndpoint).then(response => response.data.forEach(element => {
        if(element.id == todo.id) {
          axios.put(this.todoAPIEndpoint, {id:todo.id, text: todo.text, active: todo.active})
        }
      }))
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.active {
  text-decoration: line-through;
}
.cursor {
  cursor: pointer;
}
</style>
