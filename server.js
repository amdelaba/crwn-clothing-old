const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// .dotevn looks for .nv file in root folder and adds it to process.env
// Stripe secret key in .env file
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express();

// In development http://localhost:5000 
const port = process.env.PORT || 5000;

// Processes all the requests body tags and converts to JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build'))); 

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port: ' + port)
});
  
// will receive stripe token from client side
// need to send request to stripe
app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  };
  console.log('PAYMENT REQUEST RECEIVED!!');
  console.log(body);
  

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });

})