const dom = {
  form: document.getElementById("task-form"),
  input: document.getElementById("task-input"),
  dateInput: document.getElementById("task-date"),
  list: document.getElementById("task-list"),
  search: document.getElementById("search-input"),
  emptyMessage: document.getElementById("empty-message"),
  priorityInput: document.getElementById("task-priority"),
  categoryInput: document.getElementById("task-category"),
  counter: document.getElementById("task-counter"),
  themeToggle: document.getElementById("theme-toggle"),
  body: document.body,
  menuToggle: document.getElementById("menu-toggle"),
  sidebar: document.getElementById("sidebar"),
};

const STORAGE_KEYS = {
  tasks: "tasks",
  theme: "theme",
};

const CATEGORY_EMOJIS = { trabajo: "💼", personal: "👤", estudio: "📚" };
const PRIORITY_LABELS = { low: "Baja", medium: "Media", high: "Alta" };
const PRIORITY_CLASSES = { low: "priority-low", medium: "priority-medium", high: "priority-high" };

function syncStatus(tasks) {
  if (dom.counter) {
    const completed = tasks.filter((t) => t.completed).length;
    const pending = tasks.length - completed;
    dom.counter.textContent = `Pendientes: ${pending} | Completadas: ${completed}`;
  }

  if (dom.emptyMessage) dom.emptyMessage.style.display = tasks.length ? "none" : "block";
}

function createTasksStore({ storageKey, onSync }) {
  let tasks = [];

  function persist() {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }

  function persistAndSync() {
    persist();
    onSync(tasks);
  }

  async function load() {
  try {
    tasks = await fetchTasks();
    persist();
  } catch {
    const saved = localStorage.getItem(storageKey);
    try {
      tasks = JSON.parse(saved) || [];
    } catch {
      tasks = [];
    }
  }
  onSync(tasks);
  return tasks;
}

  function getAll() {
    return tasks;
  }

  async function add(task) {
  try {
    const savedTask = await createTask({
      text: task.text,
      category: task.category,
      priority: task.priority,
      reminder: task.reminder || undefined,
    });
    tasks.push(savedTask);
  } catch {
    tasks.push(task);
  }
  persistAndSync();
}

  async function deleteTask(id) {
  try {
    await deleteTask(id);
  } catch {}
  tasks = tasks.filter((task) => task.id !== id);
  persistAndSync();
}

  async function setCompleted(id, completed) {
  try {
    await toggleTask(id);
  } catch {
    const task = tasks.find((t) => t.id === id);
    if (task) task.completed = completed;
  }
  persistAndSync();
}

  function completeAll() {
    tasks.forEach((t) => (t.completed = true));
    persistAndSync();
  }

  function deleteCompleted() {
    tasks = tasks.filter((t) => !t.completed);
    persistAndSync();
  }

  function sortByPriority() {
    const order = { high: 1, medium: 2, low: 3 };
    tasks.sort((a, b) => (order[a.priority] ?? 999) - (order[b.priority] ?? 999));
    persistAndSync();
  }

  function sortByDate() {
    tasks.sort((a, b) => {
      if (!a.reminder) return 1;
      if (!b.reminder) return -1;
      return new Date(a.reminder) - new Date(b.reminder);
    });
    persistAndSync();
  }

  return {
    load,
    getAll,
    add,
    deleteTask,
    setCompleted,
    completeAll,
    deleteCompleted,
    sortByPriority,
    sortByDate,
  };
}

function createTaskView({ dom, categoryEmojis, onToggleCompleted, onDeleteTask }) {
  function buildPriorityTag(priority) {
    const tag = document.createElement("span");
    tag.className = "priority-tag";

    const label = PRIORITY_LABELS[priority] ?? PRIORITY_LABELS.low;
    const klass = PRIORITY_CLASSES[priority] ?? PRIORITY_CLASSES.low;

    tag.textContent = label;
    tag.classList.add(klass);
    return tag;
  }

  function buildCategoryTag(category) {
    const tag = document.createElement("span");
    tag.className = "category-tag";
    tag.textContent = (categoryEmojis[category] || "") + " " + (category || "");
    return tag;
  }

  function createTaskElement(task) {
    const li = document.createElement("li");
    li.dataset.id = task.id;

    const left = document.createElement("div");
    left.className = "task-left";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(task.completed);

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;

    if (task.completed) {
      span.style.textDecoration = "line-through";
      span.style.opacity = "0.5";
    }

    const priorityTag = buildPriorityTag(task.priority);
    const categoryTag = buildCategoryTag(task.category);

    const meta = document.createElement("div");
    meta.className = "task-meta";

    const date = document.createElement("small");
    date.className = "task-date";
    date.textContent = task.createdAt;

    meta.appendChild(priorityTag);
    meta.appendChild(categoryTag);
    meta.appendChild(date);

    const textChildren = document.createDocumentFragment();
    textChildren.appendChild(checkbox);
    textChildren.appendChild(span);

    if (task.reminder) {
      const reminder = document.createElement("small");
      reminder.className = "task-reminder";
      reminder.textContent = "⏰ " + new Date(task.reminder).toLocaleString();
      textChildren.appendChild(reminder);
    }

    left.appendChild(textChildren);

    checkbox.addEventListener("change", () => {
      const completed = checkbox.checked;
      onToggleCompleted(task.id, completed);
      span.style.textDecoration = completed ? "line-through" : "none";
      span.style.opacity = completed ? "0.5" : "1";
    });

    const btn = document.createElement("button");
    btn.className = "delete-btn";
    btn.textContent = "✕";
    btn.addEventListener("click", () => {
      onDeleteTask(task.id);
      li.remove();
    });

    li.appendChild(left);
    li.appendChild(meta);
    li.appendChild(btn);

    return li;
  }

  function renderTasks(tasks) {
    dom.list.innerHTML = "";
    tasks.forEach((task) => dom.list.appendChild(createTaskElement(task)));
  }

  function appendTask(task) {
    dom.list.appendChild(createTaskElement(task));
  }

  return { renderTasks, appendTask };
}

const tasksStore = createTasksStore({
  storageKey: STORAGE_KEYS.tasks,
  onSync: syncStatus,
});

const taskView = createTaskView({
  dom,
  categoryEmojis: CATEGORY_EMOJIS,
  onToggleCompleted: (id, completed) => tasksStore.setCompleted(id, completed),
  onDeleteTask: (id) => tasksStore.deleteTask(id),
});

function renderTasks() {
  taskView.renderTasks(tasksStore.getAll());
}

function setupEvents() {
  dom.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = dom.input.value.trim();
    if (text === "") return;

    const task = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toLocaleString(),
      reminder: dom.dateInput.value,
      priority: dom.priorityInput.value,
      category: dom.categoryInput.value,
    };

    tasksStore.add(task);
    taskView.appendTask(task);

    dom.input.value = "";
    dom.dateInput.value = "";
  });

  dom.search.addEventListener("input", () => {
    const value = dom.search.value.toLowerCase();
    const items = dom.list.querySelectorAll("li");
    items.forEach((item) => {
      const textEl = item.querySelector(".task-text");
      const text = textEl ? textEl.textContent.toLowerCase() : "";
      item.style.display = text.includes(value) ? "flex" : "none";
    });
  });

  if (dom.themeToggle) {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
    if (savedTheme === "light") {
      dom.body.classList.add("light");
      dom.themeToggle.textContent = "Modo Oscuro";
    } else {
      dom.themeToggle.textContent = "Modo Claro";
    }

    dom.themeToggle.addEventListener("click", () => {
      dom.body.classList.toggle("light");
      if (dom.body.classList.contains("light")) {
        dom.themeToggle.textContent = "Modo Oscuro";
        localStorage.setItem(STORAGE_KEYS.theme, "light");
      } else {
        dom.themeToggle.textContent = "Modo Claro";
        localStorage.setItem(STORAGE_KEYS.theme, "dark");
      }
    });
  }

  if (dom.menuToggle && dom.sidebar) {
    dom.menuToggle.addEventListener("click", () => {
      dom.sidebar.classList.toggle("active");
    });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await tasksStore.load();
  renderTasks();
});

function filterTasks(type) {
  const items = dom.list.querySelectorAll("li");
  const tasks = tasksStore.getAll();

  items.forEach((item) => {
    const id = Number(item.dataset.id);
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    if (type === "all") item.style.display = "flex";
    else if (type === "active") item.style.display = task.completed ? "none" : "flex";
    else if (type === "completed") item.style.display = task.completed ? "flex" : "none";
  });
}

function filterCategory(cat) {
  const items = dom.list.querySelectorAll("li");
  const tasks = tasksStore.getAll();

  items.forEach((item) => {
    const id = Number(item.dataset.id);
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    item.style.display = cat === "all" || task.category === cat ? "flex" : "none";
  });
}

function sortByPriority() {
  tasksStore.sortByPriority();
  renderTasks();
}

function sortByDate() {
  tasksStore.sortByDate();
  renderTasks();
}

function completeAll() {
  tasksStore.completeAll();
  renderTasks();
}

function deleteCompleted() {
  tasksStore.deleteCompleted();
  renderTasks();
}

// Permite que `index.html` siga funcionando con los `onclick` existentes.
window.filterTasks = filterTasks;
window.filterCategory = filterCategory;
window.sortByPriority = sortByPriority;
window.sortByDate = sortByDate;
window.completeAll = completeAll;
window.deleteCompleted = deleteCompleted;

setupEvents();