if (!process.env.DYNO) {
  require('dotenv').config();
}

const app = require('./app');
require('./cacheHelper');
console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
console.log('EMAIL_PORT:', process.env.SECRET_KEY);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('NODE_ENV:', process.env.DYNO);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
