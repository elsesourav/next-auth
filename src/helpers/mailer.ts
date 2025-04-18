import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({
   email,
   emailType,
   userId,
}: {
   email: string;
   emailType: "VERIFY" | "RESET";
   userId: string;
}) => {
   try {
      const expiryTime = 10 * 60 * 60 * 1000 + Date.now(); // 10 hour in ms
      const hashedToken = await bcryptjs.hash(userId.toString(), 10);

      const mailHref = `${process.env.DOMAIN}/${
         emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${encodeURIComponent(hashedToken)}`;

      const mailHTML = `
         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #333;">Hello!</h2>
            <p style="font-size: 16px; color: #555;">
               ${
                  emailType === "VERIFY"
                     ? "Thank you for registering. Please verify your email address by clicking the button below."
                     : "It looks like you requested a password reset. Click the button below to reset your password."
               }
            </p>
            <div style="text-align: center; margin: 30px 0;">
               <a href="${mailHref}" 
                  style="background-color: #007bff; color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; display: inline-block;">
               ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
               </a>
            </div>
            <p style="font-size: 14px; color: #999;">
               This link will expire in 1 hour. If you didn’t request this, you can safely ignore this email.
            </p>
            <hr style="border: none; border-top: 1px solid #eee;">
            <p style="font-size: 12px; color: #bbb; text-align: center;">
               &copy;elsesourav${new Date().getFullYear()}. All rights reserved.
            </p>
         </div>
      `;

      if (emailType === "VERIFY") {
         await User.findByIdAndUpdate(userId, {
            verifyToken: hashedToken,
            verifyTokenExpiry: expiryTime,
         });
      } else if (emailType === "RESET") {
         await User.findByIdAndUpdate(userId, {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: expiryTime,
         });
      }

      const transport = nodemailer.createTransport({
         host: "sandbox.smtp.mailtrap.io",
         port: 2525,
         auth: {
            user: "b1bffaaca6dfd7",
            pass: "c45a0030a3588e",
         },
      });

      const mailOptions = {
         from: "elsesourav@gmail.com",
         to: email,
         subject:
            emailType === "VERIFY"
               ? "Verify your email"
               : "Reset your password",
         html: mailHTML,
      };

      const mailResponse = await transport.sendMail(mailOptions);
      return mailResponse;
   } catch (error: unknown) {
      if (error instanceof Error) {
         throw new Error(error.message);
      } else {
         throw new Error("An unknown error occurred while sending email.");
      }
   }
};
