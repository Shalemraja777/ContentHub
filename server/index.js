import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

//components
import Connection from './database/db.js';
import Router from './routes/route.js';
import Item from './model/Item.js'; 

dotenv.config();
 // Your Mongoose model for items
const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);


const PORT = 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);
app.get('/api/search', async (req, res) => {
    // const { q } = req.query;
  
    try {
      const searchResults = await Item.find([
        {
          $search: {
            index: "default",
            text: {
              query: req.query.t,
              path: {
                wildcard: "*"
              }
            }
          }
        }
      ]);
      res.json(searchResults);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));