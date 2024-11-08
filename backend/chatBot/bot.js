import manager from './training.js'

const Manager = manager;

export const bot = async (req, res) => {
    const {messages} = req.body

    // Debugging: log the user message to check if it's passed correctly
    console.log("User message:", messages);

    // Process the user message and get the response
    const response = await Manager.process('en', messages);
console.log(response.intent)
    // Debugging: log the detected intent and response
  

    // Respond based on intent
    if (response.intent === 'greeting') {
        res.json({ reply: 'Hi there! How can I assist you today?' });
    } else if (response.intent === 'view_jobs') {
        res.json({ reply: 'Here are some job listings: Software Engineer, Product Manager, etc.' });
    } else if (response.intent === 'apply_job') {
        res.json({ reply: 'To apply for a job, please visit the application page.' });
    } else if (response.intent === 'check_status') {
        res.json({ reply: 'Please provide your application ID to check the status.' });
    } else if (response.intent === 'schedule_interview') {
        res.json({ reply: 'I can help you schedule an interview. When are you available?' });
    } else {
        res.json({ reply: "I'm sorry, I didn’t understand that. Could you rephrase?" });
    }
};
