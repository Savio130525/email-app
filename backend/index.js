const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail', // ou outro, como 'Outlook', 'Yahoo'
  auth: {
    user: 'seu-email@gmail.com',
    pass: 'sua-senha-ou-senha-de-aplicativo'
  }
});

app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'seu-email@gmail.com',
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar:', error);
      res.status(500).json({ error: 'Erro ao enviar o e-mail' });
    } else {
      console.log('Email enviado:', info.response);
      res.json({ message: 'E-mail enviado com sucesso!' });
    }
  });
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
