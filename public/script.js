
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname === '/tasks') {
        loadTasks();
    }

    if (window.location.pathname === '/create-task') {
        const form = document.getElementById('create-task-form');
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            createTask();
        });
    }
});


function loadTasks() {
    fetch('/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            const taskList = document.getElementById('task-list').getElementsByTagName('tbody')[0];
            tasks.forEach(task => {
                const row = taskList.insertRow();
                row.innerHTML = `
                    <td>${task.title}</td>
                    <td>${task.description}</td>
                    <td>${task.status}</td>
                `;
            });
        });
}


function createTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
    })
        .then(response => {
            if (response.ok) {
                window.location.href = '/tasks';
            }
        });
}
