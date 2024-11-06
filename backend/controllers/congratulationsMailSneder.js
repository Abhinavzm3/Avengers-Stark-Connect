import dotenv from 'dotenv';
dotenv.config();
import htmlContentjob from "../models/mail.js";
import { User } from '../models/user.model.js';
import { Application } from '../models/application.model.js';
import nodemailer from 'nodemailer';
import { application } from 'express';


const transporter = nodemailer.createTransport({
    service: 'gmail',  
    auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASSWORD  
    }
});







export const sendJobNotificationEmails = async (application) => {


    const app = await Application.findOne({_id:application._id}).populate('applicant').populate({
        path:"job", model:"Job",populate:{ path:"company" ,model:"Company"}
    });  
// console.log(app)
const user=app.applicant
    const email = user.email  // Get all user emails
const job=app.job
    const mailOptions = {
        from: process.env.EMAIL_USER,  // Sender address
        to: email,  // Send to all users
        subject: `Congratulations! ${user.fullname} You've been selected for: ${job.title}`,  // Email subject
        html: `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            color: #333;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #ffffff;
                            border-radius: 8px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            text-align: center;
                            background-color: #4CAF50;
                            color: white;
                            padding: 20px;
                            border-radius: 8px 8px 0 0;
                        }
                        .content {
                            padding: 20px;
                        }
                        .content h2 {
                            color: #4CAF50;
                        }
                        .footer {
                            font-size: 14px;
                            text-align: center;
                            color: #777;
                            margin-top: 30px;
                        }
                        .btn {
                            display: inline-block;
                            padding: 10px 20px;
                            margin-top: 20px;
                            background-color: #4CAF50;
                            color: white;
                            text-decoration: none;
                            border-radius: 5px;
                        }
                        .btn:hover {
                            background-color: #45a049;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Congratulations! ${user.fullname}</h1>
                        </div>
                        <div class="content">
                            <h2>You have been selected for the position of <strong>${job.title}</strong>!</h2>
                            <p>Dear ${await User.findOne({ email: email }).fullname},</p>
                            <p>We are excited to inform you that you have been selected for the role of <strong>${job.title}</strong> at <strong>${job.company.name}</strong>.</p>
                            <p>We look forward to having you join us soon and wish you all the best in the next steps. Please reply to this email or click the button below to confirm your interest.</p>

                            <p>
                          Job Descriptions:  ${job.description}<hr><br><br>
                          Location:  ${job.location}
                            </p>
                            <a href="#" class="btn">Confirm your participation</a>
                        </div>
                        <div class="footer">
                            <p>If you have any questions, feel free to reply to this email.</p>
                        </div>
                    </div>
                </body>
            </html>
        `,
        text: `Congratulations ${await User.findOne({ email: email }).fullname}! 
    
    You have been selected for the position of ${job.title} at ${application.company}.
    
    We are excited to have you join us! Please reply to this email or click the confirmation link to confirm your participation.
    
    Job: ${application.job}
    Company: ${application.company}
    
    We look forward to welcoming you aboard!`
    };
    

    await transporter.sendMail(mailOptions);
};








