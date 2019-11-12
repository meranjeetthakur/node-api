const express = require('express');

const router = express.Router();
var mongoose = require('mongoose');
const Product = require('../models/product');
router.get('/', (req, res, next) => {

Product.find()
.exec()
.then(docs=>{
    res.status(200).json({
        docs

    });
})
.catch(err =>{
    res.status(500).json({
        err
    });
})
    
});

router.post('/', (req, res, next) => {
console.log(req.body);
    
    const product = new Product({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
    });

    product.save().then(result => {
         console.log(result)
         res.status(200).json({
            message: 'Handling POST requests to /products',
            product:product
        }); 
        }).
         catch(err =>{console.log(err)});
    
});
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
   Product.findById(id)
   .exec()
   .then(doc => {
       console.log(doc);
        if(doc)
        {
            res.status(200).json({doc})
        }
        else{
            res.status(404).json({message:'No valid record'})   
        }
       
    })
   .catch(err => {
       console.log(err);
        res.status(500).json({err})
    }); 
});

router.patch('/:productId', (req, res, next) => {
    var id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id:id}, { $set:{updateOps}}).exec()
    .then(result=>{
       console.log(result);
       res.status(200).json({
        result
    });
    })
    .catch(err=>{
        res.status(500).json({
            err
        });
    })
    
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id:id})
    .exec()
    .then(result=>{
        res.status(200).json({
result
        });
    })
    .catch(err => {
        res.status(200).json({
          err
        });
    })
    
});
module.exports = router;