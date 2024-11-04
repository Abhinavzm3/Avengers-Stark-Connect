const generateJobEmail = (job) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            background-color: #f9f9f9;
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
        }
        .footer {
            background-color: #f1f1f1;
            color: #555;
            text-align: center;
            padding: 10px;
            font-size: 12px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            font-size: 16px;
            color: white;
            background-color: #4CAF50;
            text-decoration: none;
            border-radius: 4px;
        }
        .button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Job Posted: ${job.title}</h1>
        </div>
        <div class="content">
            <h2>Job Details</h2>
            <p><strong>Title:</strong> ${job.title}</p>
            <p><strong>Description:</strong> ${job.description}</p>
            <p><strong>Requirements:</strong> ${job.requirements.join(', ')}</p>
            <p><strong>Salary:</strong> $${job.salary}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <p><strong>Job Type:</strong> ${job.jobType}</p>
            <p><strong>Experience Level:</strong> ${job.experienceLevel}</p>
            <p><strong>Number of Positions:</strong> ${job.position}</p>
            <a href="#" class="button">Apply Now</a>
            <p>Best Regards,<br>Your Job Platform Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2023 Your Job Platform, Inc.</p>
        </div>
    </div>
</body>
</html>
`;
export default generateJobEmail;