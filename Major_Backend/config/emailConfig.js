const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log("ERROR", err);
    } else {
      console.log("Mail Sent Succesfully", info);
    }
  });
};

module.exports = sendEmail;
