const { Pool } = require('pg');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Connection pool for general PostgreSQL server (no specific database)
const serverPool = new Pool({
  connectionString: 'postgres://postgres:root@localhost:5432/postgres'
});

// Function to create the database if it doesn't exist
async function createDatabase() {
  const dbName = 'currency_converter';
  
  try {
    const res = await serverPool.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);
    
    if (res.rowCount === 0) {
      await serverPool.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database "${dbName}" created successfully`);
    } else {
      console.log(`Database "${dbName}" already exists`);
    }
  } catch (error) {
    console.error('Error creating database:', error);
    throw error;
  }
}

// Connection pool for the specific application database
const pool = new Pool({
  connectionString: 'postgres://postgres:root@localhost:5432/currency_converter'
});

// Function to check and create the schema and table if they don't exist
async function checkAndCreateSchema() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS conversions (
      id SERIAL PRIMARY KEY,
      from_currency VARCHAR(3) NOT NULL,
      to_currency VARCHAR(3) NOT NULL,
      amount NUMERIC NOT NULL,
      converted_amount NUMERIC NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('Table "conversions" is ready');
  } catch (error) {
    console.error('Error checking/creating table:', error);
    throw error; // Exit application if the table creation fails
  }
}

// Ensure database and schema exist before starting the server
createDatabase().then(() => {
  return checkAndCreateSchema();
}).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
  console.error('Failed to start the server:', error);
  process.exit(1); // Exit the application if database/schema creation fails
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/convert', async (req, res) => {
  const { fromCurrency, toCurrency, amount } = req.query;

  try {
    const conversionRate = getConversionRate(fromCurrency, toCurrency);
    const convertedAmount = parseFloat(amount) * conversionRate;

    const query = {
      text: 'INSERT INTO conversions (from_currency, to_currency, amount, converted_amount) VALUES ($1, $2, $3, $4) RETURNING id',
      values: [fromCurrency, toCurrency, amount, convertedAmount]
    };
    const result = await pool.query(query);

    res.json({ convertedAmount, id: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/history', async (req, res) => {
  try {
    const query = 'SELECT * FROM conversions ORDER BY created_at DESC';
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

function getConversionRate(fromCurrency, toCurrency) {
  const conversionRates = {
    USD: {
      EUR: 0.92,
      USD: 1,
    },
    EUR: {
      USD: 1.09,
      EUR: 1,
    },
  };

  if (fromCurrency in conversionRates && toCurrency in conversionRates[fromCurrency]) {
    return conversionRates[fromCurrency][toCurrency];
  } else {
    throw new Error('Conversion rate not found');
  }
}
