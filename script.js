// Initialize EmailJS with your User ID
emailjs.init('YOUR_EMAILJS_USER_ID'); // Replace with your EmailJS user ID

document.getElementById('uploadForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  const status = document.getElementById('statusMessage');

  if (!file) {
    status.textContent = "Please select a file first.";
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
      file_name: file.name,
      file_data: reader.result,
    }).then(
      () => {
        status.textContent = "File sent successfully!";
        fileInput.value = "";
      },
      (error) => {
        status.textContent = "Error sending file: " + error.text;
      }
    );
  };

  reader.readAsDataURL(file); // Convert file to base64
});
