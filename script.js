// Select Dom Element
const input = document.getElementById('todo-input')
const addBtn = document.getElementById('add-btn')
const list = document.getElementById('todo-list')

const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
    //save current to do array to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}

// create a dom node for a todo object and append it to the list 
function createTodoNode(todo, index) {
    const li = document.createElement('li');
    li.style.display = "flex";
li.style.justifyContent = "space-between";
li.style.alignItems = "center";

    // text of the todo 
    const textSpan = document.createElement("span");
    
    textSpan.textContent = todo.text;
    textSpan.style.margin = '10px';
    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }

    // checkbox to toggle completion
    const checkbox = document.createElement('input'); // ✅ fixed
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;

    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;

        // strike-through update
        textSpan.style.textDecoration = todo.completed ? 'line-through' : "";
        saveTodos();
    });

    // add double click event listener to edit todo
    textSpan.addEventListener("dblclick", () => {
    const newText = prompt("Edit todo", todo.text);
    if (newText !== null && newText.trim() !== "") {
        todo.text = newText.trim();
        render();
        saveTodos();
    }
});

    /// delete todo button
    const delbtn = document.createElement('button');
    delbtn.textContent = 'delete';

    delbtn.addEventListener('click', () => {
        todos.splice(index, 1);
        render();
        saveTodos(); // ✅ fixed
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delbtn);

    return li;
}

// render the whole todo list from todo array
function render() { // ✅ fixed
    list.innerHTML = '';

    // recreate each item 
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        console.log(node, todo)
        list.appendChild(node)
    });
}

function addTodo() {
    const text = input.value.trim();
    if (!text) {
        return
    }

    // push a new todo object 
    todos.push({ text, completed: false }); // ✅ cleaned
    input.value = '';
    render()
    saveTodos()
}

addBtn.addEventListener("click", addTodo);
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});

render();