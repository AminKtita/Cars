const cron = require('node-cron');
const axios = require('axios');

cron.schedule('0 1 * * *', async () => {
    console.log('===================');
    console.log('Cron job started at', new Date().toLocaleString('en-US', { timeZone: 'Africa/Tunis' }));

    try {
        
        console.log('Running POST request to scrapy-api:');
        const response = await axios.post('http://scrapy:8002/scrape', {}, {
            timeout: 30000, 
        });
        console.log('POST request successful:', response.data);
    } catch (error) {
        console.error('Error during cron job execution:', error.message);
    }

    console.log('Cron job finished at', new Date().toLocaleString('en-US', { timeZone: 'Africa/Tunis' }));
    console.log('===================');
}, {
    timezone: 'Africa/Tunis' 
});

console.log('Cron job scheduled to run every day at 1 AM (Tunisia time)...');