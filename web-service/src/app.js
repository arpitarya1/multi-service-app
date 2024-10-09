const express = require('express');
const app = express();
const port = 3000;

// Connect to database
const { Pool } = require('pg');
const db = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
});

// Connect to Redis cache
const redis = require('redis');
const cache = redis.createClient({
  host: process.env.CACHE_HOST,
  port: 6379,
});

// Middleware
app.use(express.json());

// Routes
app.get('/products', async (req, res) => {
  try {
    const products = await getProductsFromDatabase();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const product = await getProductFromCache(req.params.id);
    if (!product) {
      product = await getProductFromDatabase(req.params.id);
      await cacheProduct(product);
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// Helper functions
async function getProductsFromDatabase() {
  const result = await db.query('SELECT * FROM products');
  return result.rows;
}

async function getProductFromDatabase(id) {
  const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
  return result.rows[0];
}

async function getProductFromCache(id) {
  return new Promise((resolve, reject) => {
    cache.get(id, (err, product) => {
      if (err) reject(err);
      resolve(product);
    });
  });
}

async function cacheProduct(product) {
  cache.set(product.id, JSON.stringify(product));
}

// Start server
app.listen(port, () => {
  console.log(`Web Service listening on port ${port}`);
});