const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());

app.post('/event', (req, res) => {
  const body = req.body;
  switch (body.type) {
    case 'url_verification':
      if (body.challenge) {
        res.send(body.challenge);
      } else {
        res.sendStatus(400).send('No challenge token');
      }
      break;
    default:
      res.send('OK');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Started listening on port ${port}...`);
});

