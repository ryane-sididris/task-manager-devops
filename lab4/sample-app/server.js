// server.js
const app = require('./app');
const port = process.env.PORT || 8080;
const host = '0.0.0.0';

app.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`);
});
