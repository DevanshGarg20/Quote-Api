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

app.post('/api/quotes', (req,res,next) => {
  if(req.query.quote && req.query.person){
  const newQuote = {
    quote: req.query.quote,
    person: req.query.person
  }
  quotes.push(newQuote)
  res.status(201).send({quote: newQuote})
}else{
  res.status(404).send("please enter quote and person")
}
})

app.listen(PORT, () => {
  console.log("server is up and running");
})
