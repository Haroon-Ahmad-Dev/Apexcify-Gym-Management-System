const cron = require('node-cron');
const sendEmail = require('./email');
const User = require('../models/User');

cron.schedule('0 10 * * *', async () => {
  try {
    const users = await User.find();

    for (const user of users) {
      await sendEmail(
        user.email,
        'Gym Update',
        `<p>Hello ${user.name},</p>
         <p>System updates are underway. Stay fit 💪</p>`
      );
    }

    console.log('Daily update emails sent');
  } catch (error) {
    console.error('Cron job error:', error.message);
  }
});
