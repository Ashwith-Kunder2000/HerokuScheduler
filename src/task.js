
const { getCache, setCache } = require('./cacheHelper');
const nodemailer = require('nodemailer');

const LAST_RUN_KEY = 'task:lastRunTime';
const TTL = 24 * 60 * 60; // 1 day in seconds

async function runTask() {
    try {
        const now = Date.now(); // current time in ms
        const lastRun = await getCache(LAST_RUN_KEY);

        const diffMinutes = lastRun ? (now - Number(lastRun)) / 1000 / 60 : null;

        console.log('🔹 Running runTask at:', new Date(now).toLocaleString());
        console.log('Last run:', lastRun ? new Date(Number(lastRun)).toLocaleString() : 'Never');
        if (diffMinutes !== null) console.log('Minutes since last run:', diffMinutes.toFixed(1));

        if (!lastRun || diffMinutes >= 20) {
            console.log('✅ Executing task...');
            await executeTask();
            await setCache(LAST_RUN_KEY, now, TTL);
        } else {
            console.log(`⏭ Skipping task. Last run was ${diffMinutes.toFixed(1)} min ago`);
        }

    } catch (err) {
        console.error('❌ Error in runTask:', err);
    }
}

async function executeTask() {
    try {
        console.log('🔹 Running actual task at', new Date().toLocaleString());

        const receiverEmail = process.env.EMAIL_USER; // or any email
        const subject = "Test Email from Node.js App";
        const body = "Hello! This is a test email sent from your Heroku Scheduler app.";

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: false, // true for port 465
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: receiverEmail,
            subject,
            text: body
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('📧 Email sent successfully! MessageId:', info.messageId);

    } catch (err) {
        console.error('❌ Error sending email:', err);
    }
}

// Run task if executed directly
if (require.main === module) {
    runTask();
}

// Export to use elsewhere if needed
module.exports = { runTask };
 