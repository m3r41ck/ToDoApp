document.addEventListener("DOMContentLoaded", () => {
    const chatInputField = document.getElementById("chat-input");
    const chatSubmitButton = document.getElementById("submit_message");
    const chatField = document.getElementById("chat-form")

    chatField.addEventListener("submit", function(event) {
        event.preventDefault();
        const message =  chatInputField.value;
        fetch()
        console.log("Message submitted:", message)
        document.getElementById('chat-input').value = '';
    });
};