const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');

const app = express();

require('dotenv').config()

// https://www.mongodb.com/cloud/atlas
mongoose.connect(process.env.CONNECTION_URL)
    .then(() => console.log('Mongo DB connected.')) // app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log('Mongo DB connection failed',error) )

// middleware with CORS pour que front 4200 et back 3000 puissent communiquer entre eux.
app.use((req, res, next) => {
    // ces headers permettent:

    // d'accéder à notre API depuis n'importe quelle origine ( '*'
    res.setHeader('Access-Control-Allow-Origin', '*');

    // d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');

    // d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));

// import postRoutes from './routes/posts.js'
// import userRoutes from './routes/user.js'
// app.use('/posts', postRoutes);
app.use('/api/auth/', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello to restaurant angular API')
})

module.exports = app;
