const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./db');
require('dotenv').config({ quiet: true });

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());



//import routes
const testRoutes = require('./routes/testRouter');
app.use('/api/v1/test',testRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/v1/auth', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/v1/user', userRoutes);

const resturentRoutes = require('./routes/returentRoutes');
app.use('/api/v1/resturent', resturentRoutes);

const cateogaryRoutes = require('./routes/cateegoryRoutes')
app.use('/api/v1/cateogary', cateogaryRoutes);


const foodRoutes = require('./routes/foodRoutes');
app.use('/api/v1/food', foodRoutes);

app.get('/',(req,res)=>{
    res.status(200).send('<h1>welcome to returent<h1>');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server iss listing on port ${PORT}`);
}
)