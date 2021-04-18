require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const sendGridAPIKey = process.env.SEND_GRID_API_KEY;

sgMail.setApiKey(sendGridAPIKey);

const sendWelcomeEmail = async (email, name) => {
  await sgMail.send({
    to: email,
    from: process.env.MY_EMAIL,
    subject: "Thanks for joining in!",
    text: `Welcome at the Personal Finance,${name.toUpperCase()}`,
  });
};
const sendCancelEmail = async (email, name) => {
  await sgMail.send({
    to: email,
    from: process.env.MY_EMAIL,
    subject: "This is not goodbye, this is see you later",
    text: `We regret not having been able to meet your expectations, you can come back whenever you want. goodbye ${name.toUpperCase()}`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail,
};
