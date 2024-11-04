
import { Job } from "../models/job.model.js";

import dotenv from 'dotenv';
dotenv.config();
import htmlContentjob from "../models/mail.js";


import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',  
    auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASSWORD  
    }
});


import { User } from "../models/user.model.js";  

const getUserEmails = async () => {
    const users = await User.find({}, 'email' ,{role:"student"});  
    return users.map(user => user.email);  
};



const sendJobNotificationEmails = async (job) => {
    const emails = await getUserEmails();  // Get all user emails

    const mailOptions = {
        from: process.env.EMAIL_USER,  // Sender address
        to: emails,  // Send to all users
        subject: `New Job Posted: ${job.title}`,  // Email subject
        html:htmlContentjob(job),
        text: `A new job has been posted:\n\n
               Job: ${job.title}\n
               Description: ${job.description}\n
               Location: ${job.location}\n
               Requirements: ${job.requirements.join(', ')}\n\n
               Apply now!`

    };

    await transporter.sendMail(mailOptions);
};



















// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        await sendJobNotificationEmails(job);

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
// student k liye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
