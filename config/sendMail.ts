import nodeMailer from "nodemailer";
import path from "path";
import ejs from "ejs";

let mailTransporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASS,
  },
});

export const sendMail = async (email: string, url: string) => {
  const templatePath = path.join(__dirname, "../Views/ConfirmEmail.ejs");

  const data = await ejs.renderFile(templatePath, {
    email,
    url,
  });
  try {
    await mailTransporter.sendMail({
      from: `"Magic Link" ${process.env.SENDER_EMAIL}`,
      to: email,
      subject: "Log in to Project",

      html: data,
    });
  } catch (error) {
    console.log(error);
  }
};
