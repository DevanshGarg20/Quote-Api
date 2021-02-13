const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes', (req,res,next) => {
  if(!req.query.person){
    res.send({quotes: quotes})
  }else{
    const temp = quotes.filter((quote) => {
      return quote.person === req.query.person
    })
    res.send({quotes: temp})
    }
  }
)

app.get('/api/quotes/random', (req,res,next) => {
  const randomElement = getRandomElement(quotes)
  res.send({quote: randomElement})
})

app.listen(PORT, () => {
  console.log("server is up and running");
})
