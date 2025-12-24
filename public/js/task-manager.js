// Task Manager JavaScript
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';
let editingTaskId = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    setupEventListeners();
});

function setupEventListeners() {
    // Add task button
    document.getElementById('addTaskBtn').addEventListener('click', openAddTaskModal);
    
    // Quick add task
    document.getElementById('quickAddBtn').addEventListener('click', quickAddTask);
    document.getElementById('quickTaskInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') quickAddTask();
    });
    
    // Close modal
    document.getElementById('closeTaskModal').addEventListener('click', closeTaskModal);
    
    // Save task
    document.getElementById('saveTask').addEventListener('click', saveTask);
    
    // Delete task
    document.getElementById('deleteTask').addEventListener('click', () => {
        if (editingTaskId) {
            deleteTask(editingTaskId);
            closeTaskModal();
        }
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            renderTasks();
        });
    });
    
    // Close modal on outside click
    document.getElementById('taskModal').addEventListener('click', (e) => {
        if (e.target.id === 'taskModal') {
            closeTaskModal();
        }
    });
}

function quickAddTask() {
    const input = document.getElementById('quickTaskInput');
    const title = input.value.trim();
    
    if (!title) return;
    
    const task = {
        id: Date.now(),
        title,
        description: '',
        priority: 'medium',
        category: 'personal',
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    tasks.unshift(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    input.value = '';
    renderTasks();
}

function openAddTaskModal() {
    editingTaskId = null;
    document.getElementById('taskModalTitle').textContent = 'Add Task';
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskPriority').value = 'medium';
    document.getElementById('taskCategory').value = 'personal';
    document.getElementById('taskDueDate').value = '';
    document.getElementById('deleteTask').style.display = 'none';
    document.getElementById('taskModal').classList.add('active');
}

function openEditTaskModal(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    editingTaskId = taskId;
    document.getElementById('taskModalTitle').textContent = 'Edit Task';
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDescription').value = task.description || '';
    document.getElementById('taskPriority').value = task.priority;
    document.getElementById('taskCategory').value = task.category;
    document.getElementById('taskDueDate').value = task.dueDate || '';
    document.getElementById('deleteTask').style.display = 'block';
    document.getElementById('taskModal').classList.add('active');
}

function closeTaskModal() {
    document.getElementById('taskModal').classList.remove('active');
}

function saveTask() {
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    const priority = document.getElementById('taskPriority').value;
    const category = document.getElementById('taskCategory').value;
    const dueDate = document.getElementById('taskDueDate').value;
    
    if (!title) {
        alert('Please enter a task title');
        return;
    }
    
    const taskData = {
        title,
        description,
        priority,
        category,
        dueDate
    };
    
    if (editingTaskId) {
        const index = tasks.findIndex(t => t.id === editingTaskId);
        tasks[index] = { ...tasks[index], ...taskData };
    } else {
        taskData.id = Date.now();
        taskData.completed = false;
        taskData.createdAt = new Date().toISOString();
        tasks.unshift(taskData);
    }
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    closeTaskModal();
}

function toggleTaskCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

function getDueDateInfo(dueDate) {
    if (!dueDate) return null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
        return { text: 'Overdue', class: 'overdue' };
    } else if (diffDays === 0) {
        return { text: 'Today', class: 'today' };
    } else if (diffDays === 1) {
        return { text: 'Tomorrow', class: '' };
    } else {
        return { text: dueDate, class: '' };
    }
}

function renderTasks() {
    const container = document.getElementById('tasksContainer');
    
    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(t => t.completed);
    }
    
    if (filteredTasks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No tasks</h3>
                <p>${currentFilter === 'completed' ? 'Complete some tasks to see them here' : 'Add a task to get started'}</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredTasks.map(task => {
        const dueDateInfo = getDueDateInfo(task.dueDate);
        
        return `
            <div class="task-item ${task.completed ? 'completed' : ''}" 
                 data-priority="${task.priority}"
                 data-id="${task.id}">
                <div class="task-checkbox ${task.completed ? 'checked' : ''}"
                     onclick="toggleTaskCompletion(${task.id})">
                </div>
                <div class="task-content" onclick="openEditTaskModal(${task.id})">
                    <h3>${task.title}</h3>
                    ${task.description ? `<p>${task.description}</p>` : ''}
                    <div class="task-meta">
                        <span class="task-category" data-category="${task.category}">
                            ${task.category}
                        </span>
                        ${dueDateInfo ? `
                            <span class="task-due ${dueDateInfo.class}">
                                📅 ${dueDateInfo.text}
                            </span>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// No sample data - start fresh
// Users can add their own tasks using the quick add or + button
