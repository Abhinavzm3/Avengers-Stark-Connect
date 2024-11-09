
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

export const  Forgot= async (req, res) => {
  const { email } = req.body;
let user
  try {
     user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not available");

    
    const resetToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });


   const resetURL = `http://localhost:5173/reset/${resetToken}`;

    

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset",
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
              <h2 style="color: #4CAF50; text-align: center;">Password Reset Request</h2>
              <p style="font-size: 16px; line-height: 1.5;">
                Hello ${user.name || "User"},
              </p>
              <p style="font-size: 16px; line-height: 1.5;">
                We received a request to reset your password. Click the button below to proceed:
              </p>
              <div style="text-align: center; margin: 20px 0;">
                <a href="${resetURL}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">Reset Password</a>
              </div>
              <p style="font-size: 16px; line-height: 1.5;">
                If you didn’t request a password reset, please ignore this email.
              </p>
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
              <p style="font-size: 12px; color: #777; text-align: center;">
                This is an automated message. Please do not reply to this email.
              </p>
            </div>
          </body>
        </html>
      `,
    });
    
res.send({
  success:true
})  } catch (error) {
    res.status(500).send("Error sending reset email");
  }
}




export const Reset = async (req, res) => {
  const { newPassword } = req.body;
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Hash the new password and update the user record
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (err) {
    console.error("Password reset error:", err);
    res.status(400).send({
      success: false,
      message: "Invalid or expired token",
    });
  }
}
