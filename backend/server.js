const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Подключение к MongoDB
const mongoDB = 'mongodb+srv://admin:1234@cluster0.hfc9wjc.mongodb.net/';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Маршруты
const taskRoutes = require('./routes/task.route');
app.use('/api/tasks', taskRoutes);

// Переменные
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Бекенд запущен на порту http://localhost:${port}`);
  console.log('Mongodb connect');
});
