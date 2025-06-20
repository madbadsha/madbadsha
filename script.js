emailjs.init(publicKey:"7MlCKE90wF7nVMiLm"); // Your actual EmailJS User ID

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
    emailjs.send("service_zzvbztd", "Outlook", {
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
