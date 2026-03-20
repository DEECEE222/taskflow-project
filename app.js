const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const dateInput = document.getElementById("task-date");
const list = document.getElementById("task-list");
const search = document.getElementById("search-input");
const emptyMessage = document.getElementById("empty-message");
const priorityInput = document.getElementById("task-priority");
const categoryInput = document.getElementById("task-category"); 
let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
    tasks.forEach(task => createTask(task));
  }
  saveTasks();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (text === "") return;

  const task = {
    id: Date.now(),
    text: text,
    completed: false,
    createdAt: new Date().toLocaleString(),
    reminder: dateInput.value,
    priority: priorityInput.value,
    category: categoryInput.value  
  };

  tasks.push(task);
  saveTasks();
  createTask(task);

  input.value = "";
  dateInput.value = "";
});

function createTask(task) {
  const li = document.createElement("li");
  li.dataset.id = task.id;

  const left = document.createElement("div");
  left.className = "task-left";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed || false;

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = task.text;

  if (task.completed) {
    span.style.textDecoration = "line-through";
    span.style.opacity = "0.5";
  }

  const priorityTag = document.createElement("span");
  priorityTag.className = "priority-tag";
  if (task.priority === "high") {
    priorityTag.textContent = "Alta";
    priorityTag.classList.add("priority-high");
  } else if (task.priority === "medium") {
    priorityTag.textContent = "Media";
    priorityTag.classList.add("priority-medium");
  } else {
    priorityTag.textContent = "Baja";
    priorityTag.classList.add("priority-low");
  }

  const categoryTag = document.createElement("span");
  categoryTag.className = "category-tag";
  const catEmojis = { trabajo: "💼", personal: "👤", estudio: "📚" };
  categoryTag.textContent = (catEmojis[task.category] || "") + " " + (task.category || "");

  if (task.reminder) {
    const reminder = document.createElement("small");
    reminder.className = "task-reminder";
    reminder.textContent = "⏰ " + new Date(task.reminder).toLocaleString();
    left.appendChild(reminder);
  }

  const date = document.createElement("small");
  date.className = "task-date";
  date.textContent = task.createdAt;

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
    span.style.textDecoration = checkbox.checked ? "line-through" : "none";
    span.style.opacity = checkbox.checked ? "0.5" : "1";
  });

  const btn = document.createElement("button");
  btn.className = "delete-btn";
  btn.textContent = "✕";
  btn.addEventListener("click", () => deleteTask(task.id));

  const meta = document.createElement("div");
  meta.className = "task-meta";
  meta.appendChild(priorityTag);
  meta.appendChild(categoryTag);
  meta.appendChild(date);

  left.appendChild(checkbox);
  left.appendChild(span);

  if (task.reminder) {
    const reminder = left.querySelector(".task-reminder");
    if (reminder) left.appendChild(reminder);
  }

  li.appendChild(left);
  li.appendChild(meta);
  li.appendChild(btn);
  list.appendChild(li);

  saveTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  const element = document.querySelector(`[data-id='${id}']`);
  if (element) element.remove();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));

  const counter = document.getElementById("task-counter");
  if (counter) {
    const completed = tasks.filter(t => t.completed).length;
    const pending = tasks.length - completed;
    counter.textContent = `Pendientes: ${pending} | Completadas: ${completed}`;
  }

  if (emptyMessage) {
    emptyMessage.style.display = tasks.length === 0 ? "block" : "none";
  }
}

search.addEventListener("input", () => {
  const value = search.value.toLowerCase();
  const items = list.querySelectorAll("li");
  items.forEach(item => {
    const textEl = item.querySelector(".task-text");
    const text = textEl ? textEl.textContent.toLowerCase() : "";
    item.style.display = text.includes(value) ? "flex" : "none";
  });
});

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  body.classList.add("light");
  themeToggle.textContent = "Modo Oscuro";
} else {
  themeToggle.textContent = "Modo Claro";
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  if (body.classList.contains('light')) {
    themeToggle.textContent = "Modo Oscuro";
    localStorage.setItem("theme", "light");
  } else {
    themeToggle.textContent = "Modo Claro";
    localStorage.setItem("theme", "dark");
  }
});

function filterTasks(type) {
  const items = list.querySelectorAll("li");
  items.forEach(item => {
    const id = Number(item.dataset.id);
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    if (type === "all") item.style.display = "flex";
    else if (type === "active") item.style.display = task.completed ? "none" : "flex";
    else if (type === "completed") item.style.display = task.completed ? "flex" : "none";
  });
}

function sortByPriority() {
  const order = { high: 1, medium: 2, low: 3 };
  tasks.sort((a, b) => order[a.priority] - order[b.priority]);
  renderTasks();
}

function sortByDate() {
  tasks.sort((a, b) => {
    if (!a.reminder) return 1;
    if (!b.reminder) return -1;
    return new Date(a.reminder) - new Date(b.reminder);
  });
  renderTasks();
}

function renderTasks() {
  list.innerHTML = "";
  tasks.forEach(task => createTask(task));
}

const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

function filterCategory(cat) {
  const items = list.querySelectorAll("li");
  items.forEach(item => {
    const id = Number(item.dataset.id);
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    item.style.display = (cat === "all" || task.category === cat) ? "flex" : "none";
  });
}

function completeAll() {
  tasks.forEach(t => t.completed = true);
  saveTasks();
  renderTasks();
}

function deleteCompleted() {
  tasks = tasks.filter(t => !t.completed);
  saveTasks();
  renderTasks();
}
