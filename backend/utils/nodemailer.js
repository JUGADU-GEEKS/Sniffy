import nodemailer from "nodemailer";

export const sendAlertEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,    // your Gmail
      pass: process.env.EMAIL_PASS  // app password
    }
  });

  await transporter.sendMail({
    from: `"Safety Alert System" <${process.env.SMTP_EMAIL}>`,
    to,
    subject,
    text
  });
};
