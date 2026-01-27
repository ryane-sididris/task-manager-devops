// app.js
const express = require('express');
const app = express();

// Endpoint racine
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Endpoint avec paramètre
app.get('/name/:name', (req, res) => {
  res.send(`Hello, ${req.params.name}!`);
});

// Endpoint pour additionner deux nombres
app.get('/add/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  
  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ 
      error: 'Invalid input', 
      message: 'Both parameters must be valid numbers' 
    });
  }
  
  const sum = a + b;
  res.json({ a, b, sum });
});
// Endpoint pour multiplier deux nombres
app.get('/multiply/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  
  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ 
      error: 'Invalid input',
      message: 'Both parameters must be valid numbers' 
    });
  }
  
  const product = a * b;
  res.json({ a, b, product });
});

// Endpoint de division
app.get('/divide/:a/:b', (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  
  // Validation
  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({
      error: 'Invalid input',
      message: 'Both parameters must be valid numbers'
    });
  }
  
  // Division par zéro
  if (b === 0) {
    return res.status(400).json({
      error: 'Invalid input',
      message: 'Cannot perform division by zero'
    });
  }
  
  const quotient = a / b;
  res.json({ a, b, quotient });
});

module.exports = app;
