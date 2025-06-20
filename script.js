// Include EmailJS library and initialize
(function () {
  emailjs.init("7MlCKE90wF7nVMiLm"); // Your actual EmailJS User ID
})();

document.getElementById('uploadForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const status = document.getElementById('statusMessage');
  const form = document.getElementById('uploadForm');
  const fileInput = document.getElementById('fileInput');

  if (!fileInput.files.length) {
    status.textContent = "Please select a file first.";
    return;
  }

  emailjs.sendForm("service_zzvbztd", "Outlook", form)
    .then(() => {
      status.textContent = "File sent successfully!";
      fileInput.value = "";
    }, (error) => {
      status.textContent = "Error sending file: " + error.text;
    });
});
