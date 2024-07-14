const nodemailer = require("nodemailer");

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.APP_EMAIL_USERNAME,
    pass: process.env.APP_EMAIL_PASSWORD,
  },
});

exports.sendFeedback = async (req, res) => {
  const { subject, email, message } = req.body;

  const mailOptions = {
    from: process.env.APP_EMAIL_USERNAME,
    to: process.env.APP_EMAIL_USERNAME,
    subject: `Feedback Form: ${subject}`,
    text: `From: ${email}\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: error.toString() });
    }
    res.status(200).json({ message: "Feedback sent successfully" });
  });
};
