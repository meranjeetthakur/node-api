const express = require('express');

const router = express.Router();
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling Get requests to /products'
    });
});

router.post('/', (req, res, next) => {
console.log(req.body);
    const product = {
        name:req.body.name,
        price:req.body.price
    };
    res.status(200).json({
        message: 'Handling POST requests to /products',
        product:product
    });
});
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if(id === 'special')
    {
        res.status(200).json({
            message:'You discovered specia id'
        });
    }
    else
    {
        res.status(200).json({
            message:'You passed an id'
        });   
    }
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product'
    });
});
module.exports = router;