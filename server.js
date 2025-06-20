const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer (temporary file storage)
const upload = multer({ dest: 'uploads/' });

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// File upload + email endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  // Setup Nodemailer transport
  const transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
      user: 'madbad.sha@outlook.com',
      pass: 'fuhfbPTAJzEAJ7n' // Use App Password for Gmail
    }
  });

  // Compose mail
  const mailOptions = {
    from: '"Uploader" <YOUR_EMAIL@gmail.com>',
    to: 'recipient@example.com',
    subject: 'File Upload',
    text: `A file has been uploaded: ${file.originalname}`,
    attachments: [
      {
        filename: file.originalname,
        path: file.path
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("File sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
