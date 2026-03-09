const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const search = document.getElementById("search-input");

let tasks = [];

/* Cargar tareas guardadas */

document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("tasks");

    if(saved){
        tasks = JSON.parse(saved);
        tasks.forEach(task => createTask(task));
    }
});

/* Añadir tarea */

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = input.value.trim();

    if(text === "") return;

    const task = {
        id: Date.now(),
        text: text
    };

    tasks.push(task);

    saveTasks();
    createTask(task);

    input.value = "";
});

/* Crear tarea en el DOM */

function createTask(task){

    const li = document.createElement("li");
    li.textContent = task.text;
    li.dataset.id = task.id;

    const btn = document.createElement("button");
    btn.textContent = "❌";

    btn.addEventListener("click", () => {
        deleteTask(task.id);
    });

    li.appendChild(btn);
    list.appendChild(li);
}

/* Eliminar tarea */

function deleteTask(id){

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    const element = document.querySelector(`[data-id='${id}']`);

    if(element){
        element.remove();
    }
}

/* Guardar en LocalStorage */

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* Buscar tareas */

search.addEventListener("input", () => {

    const value = search.value.toLowerCase();
    const items = list.querySelectorAll("li");

    items.forEach(item => {

        const text = item.firstChild.textContent.toLowerCase();

        if(text.includes(value)){
            item.style.display = "block";
        }else{
            item.style.display = "none";
        }

    });

});

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Inicial: página inicia oscura
body.classList.remove('light');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light'); // activa/desactiva modo claro

    if(body.classList.contains('light')){
        // Cambiamos estilos inline para modo claro
        body.style.backgroundColor = "#ffffff";
        body.style.color = "#111827"; // texto oscuro
    } else {
        // Restauramos modo oscuro
        body.style.backgroundColor = "#0f172a";
        body.style.color = "#e2e8f0";
    }
});