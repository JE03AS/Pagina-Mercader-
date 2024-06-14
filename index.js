const express = require('express');
const connection = require('./db');
const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.post('/products', (req, res) => {
    const { name, description, price } = req.body;
    const query = 'INSERT INTO products (name, description, price) VALUES (?, ?, ?)';
    connection.query(query, [name, description, price], (error, results) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        res.status(201).send(`Product added with ID: ${results.insertId}`);
      }
    });
  });

  app.get('/products/:id', (req, res) => {
    const query = 'SELECT * FROM products WHERE id = ?';
    connection.query(query, [req.params.id], (error, results) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (results.length === 0) {
        res.status(404).send('Product not found');
      } else {
        res.status(200).json(results[0]);
      }
    });
  });

  app.get('/products', (req, res) => {
    const query = 'SELECT * FROM products ORDER BY created_at DESC';
    connection.query(query, (error, results) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        res.status(200).json(results);
      }
    });
  });
  