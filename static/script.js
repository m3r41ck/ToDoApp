document.addEventListener("DOMContentLoaded", () => {
    loadTodoItems()
    loadChatMessages()

    document.querySelector('#add-task-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const taskTitle = document.getElementById('task-title').value;

        fetch('/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: taskTitle })
    })
    .then(response => response.json())
    .then(newTask => {
        createNewToDoItem(newTask);
        document.getElementById('task-title').value = '';
    })
    .catch(error => console.error('Error: ', error));
    });

    document.querySelector('#chat-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const chatInput = document.getElementById('chat-input');
        const message = chatInput.value;

        if (!message.trim()) return;

        fetch('/submit_message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message: message, user: 'user'})
        })
        .then(response => response.json())
        .then(newMessage => {
            displayNewMessage(newMessage)
            chatInput.value = '';
        })
    })
})

// Task List Logic
function loadTodoItems() {
    fetch('/gettasks')
        .then(response => response.json())
        .then(task_data => {
            const taskListBody = document.querySelector('#task-list-body');
            const archivedListBody = document.querySelector('#archived-list-body');
            taskListBody.innerHTML = '';
            archivedListBody.innerHTML = '';

            task_data.forEach(task => {
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
                    const completeActionButton = document.createElement('button');
                    completeActionButton.className = 'btn btn-link p-0';
                    completeActionButton.onclick = function () {
                        completeTodoItem(task.id)
                    };
                    completeActionButton.setAttribute('data-bs-toggle', 'tooltip');
                    completeActionButton.setAttribute('data-bs-placement', 'top');
                    completeActionButton.setAttribute('title', 'Complete Task');

                    // Create Complete task button icon and append to button
                    const completeActionIcon = document.createElement('i');
                    completeActionIcon.className = 'bi bi-check-lg text-white h1';
                    
                    completeActionButton.appendChild(completeActionIcon);
                    

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
                    actionsCell.appendChild(completeActionButton);
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

function createNewToDoItem(task) {
    const taskListBody = document.querySelector('#task-list-body');

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
}

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

// Chatbot Logic
function loadChatMessages() {
    fetch('/getmessages')
        .then(response => response.json())
        .then(messages_data => {
            displayAllMessages(messages_data);
        })
        .catch(error => console.error ('Error loading messages:', error));
}

function displayAllMessages(messages) {
    const chatBody = document.getElementById('chat-body');

    // Create only one div for each user and assistant session
    const userDiv = document.createElement('div');
    userDiv.className = 'd-flex flex-row justify-content-start';
    const userMessageDiv = document.createElement('div'); // Div to hold all user messages

    const assistantDiv = document.createElement('div');
    assistantDiv.className = 'd-flex flex-row justify-content-end mb-4 pt-1';
    const assistantMessageDiv = document.createElement('div'); // Div to hold all assistant messages

    messages.forEach(message => {
        const p = document.createElement('p');
        p.className = message.user === 'user' ? 'small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary' : 'small p-2 me-3 mb-1 text-white rounded-3 bg-primary';
        p.textContent = message.message;
        
        if (message.user === 'user') {
            userMessageDiv.appendChild(p);
        } else {
            assistantMessageDiv.appendChild(p);
        }
    });

    if (userMessageDiv.hasChildNodes()) {
        const img = document.createElement('img');
        img.src = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp";
        img.alt = "avatar 1";
        img.style.width = "45px";
        img.style.height = "100%";
        userDiv.appendChild(img);
        userDiv.appendChild(userMessageDiv);
        chatBody.appendChild(userDiv);
    }

    if (assistantMessageDiv.hasChildNodes()) {
        const img = document.createElement('img');
        img.src = "{{ url_for('static', filename='robot.png') }}";  // Adjust path as necessary
        img.alt = "avatar 1";
        img.style.width = "45px";
        img.style.height = "100%";
        assistantDiv.appendChild(assistantMessageDiv);
        assistantDiv.appendChild(img);
        chatBody.appendChild(assistantDiv);
    }
}

function displayNewMessage(message) {
    const chatBody = document.getElementById('chat-body');
    const message_input = document.getElementById('chat-input');

    const messageDiv = document.createElement('div');
    messageDiv.className = message.user === 'user' ? 'd-flex flex-row justify-content-start' : 'd-flex flex-row justify-content-end mb-4 pt-1';

    const contentDiv = document.createElement('div');

    const p = document.createElement('p');
    p.className = message.user === 'user' ? 'small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary' : 'small p-2 me-3 mb-1 text-white rounded-3 bg-primary';
    p.textContent = message.message;

    contentDiv.appendChild(p);

    const img = document.createElement('img');
    img.src = message.user === 'user' ? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp" : "{{ url_for('static', filename='robot.png') }}";  // Adjust path as necessary
    img.alt = "avatar";
    img.style.width = "45px";
    img.style.height = "100%";


    if (message.user === 'user') {
        messageDiv.appendChild(img); 
        messageDiv.appendChild(contentDiv);
    } else {
        messageDiv.appendChild(contentDiv);  
        messageDiv.appendChild(img);
    }


    chatBody.appendChild(messageDiv);

    chatBody.scrollTop = chatBody.scrollHeight;
}