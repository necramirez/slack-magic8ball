const bodyParser = require('body-parser');
const express = require('express');
const request = require('request-promise');

const app = express();
app.use(bodyParser.json());

const answers = [
  { type: 'affirmative', text: 'It is certain' },
  { type: 'affirmative', text: 'As I see it, yes' },
  { type: 'affirmative', text: 'It is decidedly so' },
  { type: 'affirmative', text: 'Most likely' },
  { type: 'affirmative', text: 'Without a doubt' },
  { type: 'affirmative', text: 'Outlook good' },
  { type: 'affirmative', text: 'Yes - definitely' },
  { type: 'affirmative', text: 'You may rely on it' },
  { type: 'affirmative', text: 'Yes' },
  { type: 'affirmative', text: 'Signs point to yes' },
  { type: 'non-committal', text: 'Reply hazy, try again' },
  { type: 'non-committal', text: 'Ask again later' },
  { type: 'non-committal', text: 'Better not tell you now' },
  { type: 'non-committal', text: 'Cannot predict now' },
  { type: 'non-committal', text: 'Concentrate and ask again' },
  { type: 'negative', text: 'Don\'t count on it' },
  { type: 'negative', text: 'My reply is no' },
  { type: 'negative', text: 'My sources say no' },
  { type: 'negative', text: 'Outlook not so good' },
  { type: 'negative', text: 'Very doubtful' }
];

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
    case 'app_mention':
      const { channel, user } = body;
      const answer = answers[Math.floor(Math.random() * answers.length)];
      request({
        method: 'POST',
        uri: 'https://slack.com/api/chat.postMessage',
        body: {
          channel,
          text: `<@${user}> ${answer}`
        },
        json: true
      })
        .then(() => {
          res.send(answer);
        })
        .catch(() => {
          res.sendStatus(400).send('Failed to post Slack message');
        });
      break;
    default:
      res.send('OK');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Started listening on port ${port}...`);
});

