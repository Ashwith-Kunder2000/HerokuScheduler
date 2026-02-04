const { getCache, setCache } = require('./cacheHelper');

// Key to store last run time in Redis
const LAST_RUN_KEY = 'task:lastRunTime';

// TTL for Redis cache (optional, we just store timestamp so can be long)
const TTL = 24 * 60 * 60; // 1 day in seconds

async function runTask() {
    try {
        const now = Date.now(); // current time in ms
        const lastRun = await getCache(LAST_RUN_KEY);

        if (!lastRun) {
            // First run
            console.log('First run: executing task...');
            await executeDummyTask();
            await setCache(LAST_RUN_KEY, now, TTL);
        } else {
            const diffMinutes = (now - lastRun) / 1000 / 60;
            if (diffMinutes >= 20) {
                console.log(`Last run ${diffMinutes.toFixed(1)} min ago: executing task...`);
                await executeDummyTask();
                await setCache(LAST_RUN_KEY, now, TTL);
            } else {
                console.log(`Last run ${diffMinutes.toFixed(1)} min ago: skipping task`);
            }
        }
    } catch (err) {
        console.error('Error in runTask:', err);
    }
}

async function executeDummyTask() {
    // Replace this with your actual task logic
    console.log('🔹 Running dummy task at', new Date().toLocaleString());
}

// Export so you can call it elsewhere
module.exports = { runTask };

// If you want to test directly via node task.js
if (require.main === module) {
    runTask();
}
