const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT | 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./controllers'));

mongoose.connect('mongodb://localhost:27017/social-butterfly', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// use this to log mongo queries being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));