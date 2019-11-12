const express = require('express');
var app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/orders');
app.use(morgan('dev'));
var url = "mongodb://localhost:27017/node-rest-shop";
mongoose.connect(url, {
    useNewUrlParser :true,
    useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req, res, next) =>{
res.header(
    'Access-Controll-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTION')
    {
        res.header('Access-Controll-Allow-Headers', 'PUT, GET, POST, PATCH')
        return res.status(200).json({});
    }

    next();
});

app.use('/products', productRoutes);
app.use('/orders', productRoutes);


app.use((req, res, next) => {
    const error = new Error('Not Found');
error.status = 404;
next(error);
});

app.use((error, req, res, next) =>{
res.status(error.status || 500);
res.json({
error:{
    message:error.message
}
});
});
module.exports = app;