document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    let tasks = [];

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const taskTitle = document.getElementById('taskTitle').value;
        const taskPriority = document.getElementById('taskPriority').value;
        const taskStatus = document.querySelector('input[name="taskStatus"]:checked').value;

        if (taskTitle && taskPriority && taskStatus) {
            const task = {
                title: taskTitle,
                priority: taskPriority,
                status: taskStatus
            };

            tasks.push(task);
            addTaskToList(task);
            taskForm.reset();
        }
    });

    function addTaskToList(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${task.status === 'completed' ? 'completed' : ''}">${task.title} - ${task.priority}</span>
            <button class="remove-btn">Remove</button>
            <button class="complete-btn">${task.status === 'completed' ? 'Mark as Pending' : 'Mark as Complete'}</button>
        `;
        taskList.appendChild(li);

        const removeBtn = li.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function() {
            tasks = tasks.filter(t => t !== task); // Remove task from array
            li.remove();
        });

        const completeBtn = li.querySelector('.complete-btn');
        completeBtn.addEventListener('click', function() {
            task.status = task.status === 'completed' ? 'pending' : 'completed';
            li.querySelector('span').classList.toggle('completed');
            completeBtn.textContent = task.status === 'completed' ? 'Mark as Pending' : 'Mark as Complete';
        });
    }
});
