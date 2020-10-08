const nodemailer = require('nodemailer');

// Transporter setup for sending mails
const transporter = nodemailer.createTransport({
  host: process.env.email_host,
  port: process.env.email_port,
  service: process.env.email_service,
  secure: process.env.email_secure,
  auth: {
    user: process.env.email_id,
    pass: process.env.email_pass
  }
});

const sendMail = async function (data, type) {
  let template;
  const mailOptions = {
    from: process.env.email_from,
    to: data.to.join(),
    subject: data.subject || '',
    text: data.text || ''
  };

  console.log(mailOptions);

  if (type === 'forgot') {
    template = `<p>Hi ${data.displayName},<br><br>As you have requested for reset password instructions, here they are, please follow the URL:</p>
    <p><a href="${process.env.host}${data.forgotPasswordToken}">Reset Password</a><br><br>Alternatively, open the following url in your browser<br><br><a href="${process.env.host}/resetPassword/${data.forgotPasswordToken}">${process.env.host}/resetPassword/${data.forgotPasswordToken}</a></p>`;
  }

  if (template) {
    mailOptions.html = template;
  }

  return await transporter.sendMail(mailOptions);
};

module.exports = {
  sendMail
};
