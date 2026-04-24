// ✨ Task Manager Pro - JavaScript Logic

let tasks = [];

function addTask() {
    let taskName = prompt("Enter task name:");
    if (!taskName) return;
    
    let deadline = prompt("Enter deadline (YYYY-MM-DD HH:MM):\nExample: 2026-04-25 14:30");
    
    if (!deadline) {
        alert("Deadline required!");
        return;
    }
    
    let newTask = {
        id: Date.now(),
        name: taskName,
        deadline: deadline,
        completed: false
    };
    
    tasks.push(newTask);
    alert('✅ Task added: ' + taskName);
    viewTasks();
}

function viewTasks() {
    let taskListDiv = document.getElementById('taskList');
    
    if (tasks.length === 0) {
        taskListDiv.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <p>No tasks yet. Click "Add Task" to get started!</p>
                <small>✨ Stay organized, beat deadlines! ✨</small>
            </div>
        `;
        updateStatistics();
        return;
    }
    
    let html = '';
    let now = new Date();
    
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let completedClass = task.completed ? 'completed' : '';
        let statusIcon = task.completed ? '✅' : '⏳';
        
        let timeLeftHtml = '';
        let timeClass = '';
        
        if (!task.completed) {
            try {
                let deadlineDate = new Date(task.deadline.replace(' ', 'T'));
                let timeDiff = deadlineDate - now;
                
                if (timeDiff < 0) {
                    timeLeftHtml = '🔴 OVERDUE!';
                    timeClass = 'time-urgent';
                } else {
                    let hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
                    let minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                    
                    if (hoursLeft < 1) {
                        timeLeftHtml = `⏰ ${minutesLeft} minutes left`;
                        timeClass = 'time-urgent';
                    } else if (hoursLeft < 24) {
                        timeLeftHtml = `📅 ${hoursLeft}h ${minutesLeft}m left`;
                        timeClass = 'time-warning';
                    } else {
                        let daysLeft = Math.floor(hoursLeft / 24);
                        timeLeftHtml = `📅 ${daysLeft} days left`;
                        timeClass = 'time-normal';
                    }
                }
            } catch(e) {
                timeLeftHtml = '⚠️ Invalid date format';
                timeClass = 'time-urgent';
            }
        }
        
        html += `
            <div class="task-card ${completedClass}">
                <div class="task-content">
                    <div class="task-info">
                        <div class="task-title ${completedClass}">
                            ${statusIcon} ${escapeHtml(task.name)}
                        </div>
                        <div>
                            <span class="task-deadline">📅 ${task.deadline}</span>
                        </div>
                        ${timeLeftHtml ? `<div class="time-left ${timeClass}">${timeLeftHtml}</div>` : ''}
                    </div>
                    <div class="task-actions">
                        ${!task.completed ? `<button class="action-btn action-complete" onclick="completeTaskById(${task.id})">✅ Complete</button>` : ''}
                        <button class="action-btn action-delete" onclick="deleteTaskById(${task.id})">🗑️ Delete</button>
                    </div>
                </div>
            </div>
        `;
    }
    
    taskListDiv.innerHTML = html;
    updateStatistics();
    checkAndDisplayAlerts();
}

function escapeHtml(text) {
    let div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function updateStatistics() {
    let total = tasks.length;
    let pending = 0;
    let completed = 0;
    
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].completed) {
            completed++;
        } else {
            pending++;
        }
    }
    
    let completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);
    
    document.getElementById('totalTasks').innerHTML = total;
    document.getElementById('pendingTasks').innerHTML = pending;
    document.getElementById('completedTasks').innerHTML = completed;
    document.getElementById('completionRate').innerHTML = completionRate + '%';
    
    let rateElement = document.getElementById('completionRate');
    if (completionRate >= 75) {
        rateElement.style.color = '#4caf50';
    } else if (completionRate >= 40) {
        rateElement.style.color = '#ff9800';
    } else {
        rateElement.style.color = '#f44336';
    }
}

function checkAndDisplayAlerts() {
    let now = new Date();
    let urgentTasks = [];
    let oneHourTasks = [];
    
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        if (task.completed) continue;
        
        try {
            let deadlineDate = new Date(task.deadline.replace(' ', 'T'));
            let timeDiff = deadlineDate - now;
            let hoursLeft = timeDiff / (1000 * 60 * 60);
            let minutesLeft = timeDiff / (1000 * 60);
            
            if (timeDiff < 0) {
                urgentTasks.push(`${task.name} (OVERDUE by ${Math.abs(Math.floor(minutesLeft))} min)`);
            } else if (hoursLeft <= 1 && hoursLeft > 0) {
                urgentTasks.push(`${task.name} (${Math.floor(minutesLeft)} min left!)`);
            } else if (Math.abs(hoursLeft - 1) < 0.05) {
                oneHourTasks.push(`${task.name} (1 HOUR LEFT!)`);
            }
        } catch(e) {}
    }
    
    let alertBox = document.getElementById('alertBox');
    
    if (urgentTasks.length > 0 || oneHourTasks.length > 0) {
        let alertHtml = `
            <div class="alert-box">
                <div class="alert-title">⏰ DEADLINE ALERTS</div>
                <div class="alert-message">
        `;
        
        if (urgentTasks.length > 0) {
            alertHtml += `<strong>🚨 URGENT:</strong><br>`;
            for (let i = 0; i < urgentTasks.length; i++) {
                alertHtml += `• ${urgentTasks[i]}<br>`;
            }
            alertHtml += `<br>`;
        }
        
        if (oneHourTasks.length > 0) {
            alertHtml += `<strong>⏰ 1-HOUR REMINDER:</strong><br>`;
            for (let i = 0; i < oneHourTasks.length; i++) {
                alertHtml += `• ${oneHourTasks[i]}<br>`;
            }
        }
        
        alertHtml += `</div></div>`;
        alertBox.innerHTML = alertHtml;
    } else {
        alertBox.innerHTML = '';
    }
}

function completeTaskById(taskId) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === taskId && !tasks[i].completed) {
            tasks[i].completed = true;
            alert('✅ Task completed: ' + tasks[i].name);
            viewTasks();
            return;
        }
    }
}

function deleteTaskById(taskId) {
    if (confirm('Delete this task?')) {
        let newTasks = [];
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id !== taskId) {
                newTasks.push(tasks[i]);
            }
        }
        tasks = newTasks;
        viewTasks();
    }
}

function completeAllTasks() {
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].completed = true;
    }
    alert(`🎉 Completed all tasks!`);
    viewTasks();
}

function deleteCompletedTasks() {
    let newTasks = [];
    for (let i = 0; i < tasks.length; i++) {
        if (!tasks[i].completed) {
            newTasks.push(tasks[i]);
        }
    }
    tasks = newTasks;
    alert(`🗑️ Deleted completed tasks!`);
    viewTasks();
}

function checkDetailedAlerts() {
    checkAndDisplayAlerts();
    let urgentTasks = [];
    for (let i = 0; i < tasks.length; i++) {
        if (!tasks[i].completed) {
            try {
                let deadlineDate = new Date(tasks[i].deadline.replace(' ', 'T'));
                let timeDiff = deadlineDate - new Date();
                if (timeDiff < 0) {
                    urgentTasks.push(tasks[i].name);
                }
            } catch(e) {}
        }
    }
    if (urgentTasks.length > 0) {
        alert('⚠️ You have ' + urgentTasks.length + ' overdue task(s)! Check the alert box.');
    } else {
        alert('✅ No urgent deadlines! Keep up the good work!');
    }
}

function formatDateTime(date) {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

window.onload = function() {
    if (tasks.length === 0) {
        let now = new Date();
        let thirtyMinLater = new Date(now.getTime() + 30 * 60 * 1000);
        let tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        
        tasks.push({
            id: Date.now(),
            name: "🎯 Try completing me!",
            deadline: formatDateTime(thirtyMinLater),
            completed: false
        });
        tasks.push({
            id: Date.now() + 1,
            name: "📝 Submit project report",
            deadline: formatDateTime(tomorrow),
            completed: false
        });
    }
    viewTasks();
    setInterval(function() {
        viewTasks();
    }, 60000);
};
