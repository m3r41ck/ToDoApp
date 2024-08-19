document.addEventListener("DOMContentLoaded", () => {
    loadTodoItems()
});

function loadTodoItems() {
    fetch('/gettasks')
        .then(response => response.json())
        .then(task_list => {
            const taskListBody = document.querySelector('#task-list-body');
            const archivedListBody = document.querySelector('#archived-list-body');
            taskListBody.innerHTML = '';
            archivedListBody.innerHTML = '';

            task_list.forEach(task => {
                if (!task.completed) {

                    const row = document.createElement('tr');
                    row.className = 'fw-normal';
                    row.id = `task-row-${task.id}`

                    const titleCell = document.createElement('td');
                    titleCell.className = 'align-middle';
                    titleCell.textContent = task.title;

                    const actionsCell = document.createElement('td');
                    actionsCell.className = 'align-middle';

                    // Create Complete task button
                    const unarchiveButton = document.createElement('button');
                    unarchiveButton.className = 'btn btn-link p-0';
                    unarchiveButton.onclick = function () {
                        completeTodoItem(task.id)
                    };
                    unarchiveButton.setAttribute('data-bs-toggle', 'tooltip');
                    unarchiveButton.setAttribute('data-bs-placement', 'top');
                    unarchiveButton.setAttribute('title', 'Complete Task');

                    // Create Complete task button icon and append to button
                    const unarchiveIcon = document.createElement('i');
                    unarchiveIcon.className = 'bi bi-check-lg text-white h1';
                    
                    unarchiveButton.appendChild(unarchiveIcon);
                    

                    // Create Delete button
                    const deleteButton = document.createElement('button');
                    deleteButton.className = 'btn btn-link p-0';
                    deleteButton.onclick = function(){
                        deleteTodoItem(task.id)
                    };
                    deleteButton.setAttribute('data-bs-toggle', 'tooltip');
                    deleteButton.setAttribute('data-bs-placement', 'top');
                    deleteButton.setAttribute('title', 'Delete Task');

                    //Create Delete button icon and append to button
                    const deleteIcon = document.createElement('i');
                    deleteIcon. className= 'bi bi-trash-fill text-white h1'
                    
                    deleteButton.appendChild(deleteIcon);

                    // Append Complete task button and delete button to cell. 
                    actionsCell.appendChild(unarchiveButton);
                    actionsCell.appendChild(deleteButton);

                    // Append cells to the row
                    row.appendChild(titleCell);
                    row.appendChild(actionsCell);

                    // Append the row to the table body
                    taskListBody.appendChild(row);
                    
                } else if (task.completed) {
                    const row = document.createElement('tr');
                    row.className = 'fw-normal';
                    row.id = `task-row-${task.id}`

                    const titleCell = document.createElement('td');
                    titleCell.className = 'align-middle';
                    titleCell.textContent = task.title;

                    const actionsCell = document.createElement('td');
                    actionsCell.className = 'align-middle';

                    // Create Unarchive task button
                    const unarchiveButton = document.createElement('button');
                    unarchiveButton.className = 'btn btn-link p-0';
                    unarchiveButton.onclick = function () {
                        unarchiveTodoItem(task.id) // NEED TO CHANGE
                    };
                    unarchiveButton.setAttribute('data-bs-toggle', 'tooltip');
                    unarchiveButton.setAttribute('data-bs-placement', 'top');
                    unarchiveButton.setAttribute('title', 'Unarchive Task');

                    // Create Unarchive task button icon and append to button
                    const unarchiveIcon = document.createElement('i');
                    unarchiveIcon.className = 'bi bi-box-arrow-in-left text-white h1';
                    
                    unarchiveButton.appendChild(unarchiveIcon);
                    

                    // Create Delete button
                    const deleteButton = document.createElement('button');
                    deleteButton.className = 'btn btn-link p-0';
                    deleteButton.onclick = function(){
                        deleteTodoItem(task.id)
                    };
                    deleteButton.setAttribute('data-bs-toggle', 'tooltip');
                    deleteButton.setAttribute('data-bs-placement', 'top');
                    deleteButton.setAttribute('title', 'Delete Task');

                    //Create Delete button icon and append to button
                    const deleteIcon = document.createElement('i');
                    deleteIcon.className= 'bi bi-trash-fill text-white h1'
                    
                    deleteButton.appendChild(deleteIcon);

                    // Append Complete task button and delete button to cell. 
                    actionsCell.appendChild(unarchiveButton);
                    actionsCell.appendChild(deleteButton);

                    // Append cells to the row
                    row.appendChild(titleCell);
                    row.appendChild(actionsCell);

                    // Append the row to the table body
                    archivedListBody.appendChild(row);
                }
            });
        })
}


// Complete todo item
function completeTodoItem(task_id) {
    fetch(`/complete/${task_id}`, {
        method: 'POST',
    })
    .then(response => {
        if (response.ok) {
            const row = document.querySelector(`#task-row-${task_id}`)
            if (row) {
                row.remove()
                loadTodoItems()
            }
        } else {
            console.error('Failed to complete task: ', response.statusText);
        }
    })
    .catch(error => console.error('Error', error));
}

// Delete todo item
function deleteTodoItem(task_id) {
    fetch(`/delete/${task_id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            const row = document.querySelector(`#task-row-${task_id}`)
            if (row) {
                row.remove()
                loadTodoItems()
            }
        } else {
            console.error('Failed to delete task: ', response.statusText);
        }
    })
    .catch(error => console.error('Error: ', error));
}

// Unarchive todo item
function unarchiveTodoItem(task_id) {
    fetch(`/unarchive/${task_id}`, {
        method: 'POST',
    })
    .then(response => {
        if (response.ok) {
            const row = document.querySelector(`#task-row-${task_id}`)
            if (row) {
                row.remove()
                loadTodoItems()
            }
        } else {
            console.error('Failed to unarchive task: ', response.statusText);
        }
    })
    .catch(error => console.error('Error: ', error));
}


// chatField.addEventListener("submit", function(event) {
//     event.preventDefault();
//     const message =  chatInputField.value;
//     fetch()
//     console.log("Message submitted:", message)
//     document.getElementById('chat-input').value = '';
// });