import ejs from "ejs";
import path from "path";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();
class Email {
  constructor(user, claim = null, url = null, booking = null, reason = null) {
    this.to = user.email;
    this.firstname = user.firstname;
    this.password = user.password;
    this.email = user.email;
    this.from = process.env.EMAIL_FROM;
    this.url = url;
  }

  // Send the actual email
  async send(template, subject, title) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // 1) Render HTML based on a ejs template
    const html = await ejs.renderFile(
      path.join(__dirname, `./../views/email/${template}.ejs`),
      {
        firstname: this.firstname,
        password: this.password,
        email: this.email,
        url: this.url,
      }
    );
    // 2) Define email options
    const mailOptions = {
      to: this.to, // Change to your recipient
      from: this.from, // Change to your verified sender
      subject,
      text: html,
      html,
    };
    // 3) Create a transport and send email
    sgMail
      .send(mailOptions)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error('error:',error);
      });
  }

  async sendAccountAdded() {
    await this.send("accountAdded", "welcame ! now");
  }
  async sendResetPasswordCode() {
    await this.send("ResetPasswordCode", "Your Reset Password Code ");
  }

}

export default Email;
