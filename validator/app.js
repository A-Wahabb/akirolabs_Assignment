const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Generate a random token
app.post('/api/v1/generate-token', async (req, res) => {
  try {
    const availableDigits = req.body.availableDigits;
    const token = generateRandomToken(availableDigits);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Validating a token using the Luhn algorithm
app.post('/api/v1/validate-token', async (req, res) => {
  try {
    const tokenToValidate = req.body.token;
    const isValid = luhnValidation(tokenToValidate);
    res.json({ isValid });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});


// Helper function to generate a random token
function generateRandomToken(availableDigits) {
  const tokenLength = 16;
  let token = '';
  for (let i = 0; i < tokenLength; i++) {
    const randomDigit =
      availableDigits[Math.floor(Math.random() * availableDigits.length)];
    token += randomDigit;
  }
  return token;
}

// Helper function to validate a token using the Luhn algorithm
function luhnValidation(token) {
  const digits = token.split('');
  let sum = 0;
  let evenDigit = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]);

    if (evenDigit) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    evenDigit = !evenDigit;
  }

  return sum % 10 === 0;
}



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
