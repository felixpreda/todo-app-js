const model = {
    todo: function(text) {
        this.todoText = text;
        this.completed = false;
    },

    todos: [],

    addTodo: function(text) {
        this.todos.push(new this.todo(text));
    },

    changeTodo: function(position, newValue) {
        if (this.todos[position]) {
            this.todos[position].todoText = newValue;
        } else {
            alert('Item inexistent');
        }
    },

    deleteTodo: function(position) {
        if (this.todos[position]) {
            this.todos.splice(position, 1);
        } else {
            alert('Item inexistent');
        }
    },

    toggleCompleted: function(position) {
        if (this.todos[position]) {
            const todo = this.todos[position];
            todo.completed = !todo.completed;
        } else {
            alert('Item inexistent');
        }
    },

    toggleAll: function() {
        const allTodos = this.todos.length;
        let completedTodos = 0;

        for (const todo of this.todos) {
            if (todo.completed === true) {
                completedTodos++;
            }
        }

        if (completedTodos === allTodos) {
            for (const todo of this.todos) {
                todo.completed = false
            }
        } else {
            for (const todo of this.todos) {
                todo.completed = true;
            }
        }
    }
};

const actions = {
    toggleAll: function() {
        model.toggleAll();
        view.displayTodos();
    },
    addTodo: function() {
        let newTodo = document.querySelector('#addTodoInput');

        model.addTodo(newTodo.value);
        newTodo.value = '';
        view.displayTodos();
    },
    changeTodo: function() {
        let posTodo = document.querySelector('#positionInput');
        let textTodo = document.querySelector('#changeInput');

        model.changeTodo(posTodo.valueAsNumber, textTodo.value);
        posTodo.value = '';
        textTodo.value = '';
        view.displayTodos();
    },
    toggleTodo: function() {
        let posTodo = document.querySelector('#toggleInput');

        model.toggleCompleted(posTodo.valueAsNumber);
        posTodo.value = '';
        view.displayTodos();
    },
    deleteTodo: function() {
        let delTodo = document.querySelector('#posInput');

        model.deleteTodo(delTodo.valueAsNumber);
        delTodo.value = '';
        view.displayTodos();
    }
}

const view = {
    displayTodos: function() {
        const ul = document.querySelector('ul');
        ul.innerHTML = '';

        for (const todo of model.todos) {
            const li = document.createElement('li');

            if (todo.completed) {
                li.innerHTML = `(x) ${todo.todoText}`;
            } else {
                li.innerHTML = `( ) ${todo.todoText}`;
            }

            ul.appendChild(li);
        }
    }
};