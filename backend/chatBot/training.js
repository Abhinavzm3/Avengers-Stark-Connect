import pkg from 'node-nlp';
const { NlpManager } = pkg;

// Initialize NlpManager with the desired languages
const manager = new NlpManager({ languages: ['en'] });

// Add English language to the manager
manager.addLanguage('en');

// Greeting examples
manager.addDocument('en', 'Hello', 'greeting');
manager.addDocument('en', 'Hi', 'greeting');
manager.addDocument('en', 'Hey', 'greeting');
manager.addDocument('en', 'What\'s up?', 'greeting');
manager.addDocument('en', 'How are you?', 'greeting');
manager.addDocument('en', 'Good morning', 'greeting');
manager.addDocument('en', 'Good evening', 'greeting');
manager.addDocument('en', 'Howdy', 'greeting');
manager.addDocument('en', 'Yo', 'greeting');
manager.addDocument('en', 'Sup', 'greeting');
manager.addDocument('en', 'Hola', 'greeting');
manager.addDocument('en', 'Hi there', 'greeting');

// Farewell examples
manager.addDocument('en', 'Goodbye', 'farewell');
manager.addDocument('en', 'See you later', 'farewell');
manager.addDocument('en', 'Bye', 'farewell');
manager.addDocument('en', 'Catch you later', 'farewell');
manager.addDocument('en', 'Take care', 'farewell');
manager.addDocument('en', 'See you soon', 'farewell');
manager.addDocument('en', 'Talk to you later', 'farewell');

// Job-related queries
manager.addDocument('en', 'I want to view jobs', 'view_jobs');
manager.addDocument('en', 'Show me jobs', 'view_jobs');
manager.addDocument('en', 'View job', 'view_jobs');
manager.addDocument('en', 'View jobs', 'view_jobs');
manager.addDocument('en', 'Find me a job', 'view_jobs');
manager.addDocument('en', 'What jobs are available?', 'view_jobs');
manager.addDocument('en', 'Can you show me jobs?', 'view_jobs');
manager.addDocument('en', 'I\'m looking for a job', 'view_jobs');
manager.addDocument('en', 'What positions are open?', 'view_jobs');
manager.addDocument('en', 'Job openings', 'view_jobs');
manager.addDocument('en', 'Show me available positions', 'view_jobs');

// Apply for job examples
manager.addDocument('en', 'How do I apply for a job?', 'apply_job');
manager.addDocument('en', 'I want to apply for a job', 'apply_job');
manager.addDocument('en', 'Can I apply for a position?', 'apply_job');
manager.addDocument('en', 'How can I submit an application?', 'apply_job');
manager.addDocument('en', 'Where can I apply for a job?', 'apply_job');
manager.addDocument('en', 'I want to send my resume', 'apply_job');
manager.addDocument('en', 'How to apply for this job?', 'apply_job');
manager.addDocument('en', 'Can you help me apply?', 'apply_job');

// Job status check examples
manager.addDocument('en', 'What is the status of my application?', 'check_status');
manager.addDocument('en', 'Have you reviewed my application?', 'check_status');
manager.addDocument('en', 'What happened to my application?', 'check_status');
manager.addDocument('en', 'Can I check my application status?', 'check_status');
manager.addDocument('en', 'When will I know the result of my application?', 'check_status');
manager.addDocument('en', 'Is my application accepted?', 'check_status');
manager.addDocument('en', 'Has my application been reviewed?', 'check_status');

// Interview scheduling examples
manager.addDocument('en', 'Can we schedule an interview?', 'schedule_interview');
manager.addDocument('en', 'I want to schedule an interview', 'schedule_interview');
manager.addDocument('en', 'Let\'s set up an interview', 'schedule_interview');
manager.addDocument('en', 'When can we schedule the interview?', 'schedule_interview');
manager.addDocument('en', 'I want to schedule a time for the interview', 'schedule_interview');
manager.addDocument('en', 'Let me know when you’re available for the interview', 'schedule_interview');

// Job application feedback
manager.addDocument('en', 'Please give feedback on my job application', 'feedback');
manager.addDocument('en', 'How is my job application going?', 'feedback');
manager.addDocument('en', 'Have I been considered for the role?', 'feedback');
manager.addDocument('en', 'What did you think of my application?', 'feedback');

// General questions
manager.addDocument('en', 'What is the company about?', 'company_info');
manager.addDocument('en', 'Tell me about the company', 'company_info');
manager.addDocument('en', 'What do you do?', 'company_info');
manager.addDocument('en', 'What is the job role about?', 'job_info');
manager.addDocument('en', 'What is the position description?', 'job_info');
manager.addDocument('en', 'Tell me more about the job role', 'job_info');

// Miscellaneous
manager.addDocument('en', 'I need help', 'help');
manager.addDocument('en', 'Can you assist me?', 'help');
manager.addDocument('en', 'I need some assistance', 'help');
manager.addDocument('en', 'Can you guide me?', 'help');
manager.addDocument('en', 'What should I do next?', 'help');

// Training data for thank you and appreciation
manager.addDocument('en', 'Thank you', 'thank_you');
manager.addDocument('en', 'Thanks a lot', 'thank_you');
manager.addDocument('en', 'I appreciate it', 'thank_you');
manager.addDocument('en', 'Thanks for the help', 'thank_you');

// Errors and apologies
manager.addDocument('en', 'I am sorry', 'apology');
manager.addDocument('en', 'Sorry about that', 'apology');
manager.addDocument('en', 'I didn\'t mean that', 'apology');
manager.addDocument('en', 'Sorry for the mistake', 'apology');

// Negative responses
manager.addDocument('en', 'No', 'negative');
manager.addDocument('en', 'No thanks', 'negative');
manager.addDocument('en', 'I don\'t want it', 'negative');
manager.addDocument('en', 'Not interested', 'negative');

// Positive responses
manager.addDocument('en', 'Yes', 'positive');
manager.addDocument('en', 'Sure', 'positive');
manager.addDocument('en', 'Definitely', 'positive');
manager.addDocument('en', 'I would like that', 'positive');

// Additional job-related queries
manager.addDocument('en', 'Tell me about the job requirements', 'job_requirements');
manager.addDocument('en', 'What qualifications are needed for the job?', 'job_requirements');
manager.addDocument('en', 'What are the skills required for the role?', 'job_requirements');
manager.addDocument('en', 'How do I meet the qualifications for this job?', 'job_requirements');

// Company-related queries
manager.addDocument('en', 'What is the culture of the company?', 'company_culture');
manager.addDocument('en', 'Can you tell me about the work environment?', 'company_culture');
manager.addDocument('en', 'What values does the company uphold?', 'company_culture');
manager.addDocument('en', 'Tell me more about your company culture', 'company_culture');

// Training the model
const trainBot = async () => {
    await manager.train();
    manager.save();
};

trainBot().then(() => {
    console.log("Training completed!");
}).catch((err) => {
    console.error("Error training bot: ", err);
});

export default manager;
