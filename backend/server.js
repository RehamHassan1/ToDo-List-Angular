import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rhrahoma@gmail.com', 
    pass: 'Reham552002'     
  }
});

app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;
  
  const resetLink = `http://localhost:4200/forget3?token=dummy-token`;

  transporter.sendMail({
    from: 'rhrahoma@gmail.com',
    to: email,
    subject: 'Password Reset',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`
  }, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error sending email' });
    }
    res.json({ message: 'Recovery email sent!' });
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));
