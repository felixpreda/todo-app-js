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
        this.todos.splice(position, 1);
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

        this.todos.forEach(function(todo) {
            if (todo.completed === true) {
                completedTodos++;
            }
        });

        for (const todo of this.todos) {
            todo.completed = completedTodos !== allTodos
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

    deleteTodo: function(id) {
        model.deleteTodo(id);
        view.displayTodos();
    }
}

const view = {
    displayTodos: function() {
        const ul = document.querySelector('ul');
        ul.innerHTML = '';

        model.todos.forEach((todo, position) => {
            const li = document.createElement('li');

            if (todo.completed) {
                li.innerHTML = `(x) ${todo.todoText} `;
            } else {
                li.innerHTML = `( ) ${todo.todoText} `;
            }

            li.id = position;
            li.appendChild(this.createDeleteButton());
            ul.appendChild(li);
        });
    },

    createDeleteButton: function() {
        const del = document.createElement('button');
        del.className = 'deleteButton';
        del.textContent = 'Delete';
        return del;
    },

    setupDeleteEvent: function() {
        const ul = document.querySelector('ul');

        ul.addEventListener('click', function(event) {
            if (event.target.className === 'deleteButton') {
                actions.deleteTodo(parseInt(event.target.parentNode.id));
            }
        });
    }
};

view.setupDeleteEvent();