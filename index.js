const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());

app.post('/verify', () => {
  //
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Started listening on port ${port}...`);
});

