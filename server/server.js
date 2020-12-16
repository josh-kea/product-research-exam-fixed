const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// importing routes
const postRoutes = require('./routes/post')

// app

const app = express();

// db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('DB Connected'))
.catch(err => console.log(err));

// middlewares - implement cors
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// route middleware
app.use('/api', postRoutes)



// port
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server is running on port ${port}`));


