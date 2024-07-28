// document.addEventListener("DOMContentLoaded", function () {
//     var deleteButtons = document.querySelectorAll(".delete-button");
//     deleteButtons.forEach(function (button) {
//         button.addEventListener("click", function () {
//             var taskId = button.getAttribute("data-task-id");
//             var modal = new bootstrap.Modal(document.getElementById("deleteModal"));
//             document.getElementById("confirmDelete").setAttribute("data-task-id", taskId);
//             modal.show();
//         });
//     });

//     document.getElementById("confirmDelete").addEventListener("click", function () {
//         var taskId = this.getAttribute("data-task-id");
//         var form = document.getElementById("deleteForm");
//         form.setAttribute("action", `/delete/${taskId}`);
//         form.submit();
//     });
// });
