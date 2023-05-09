const express = require('express');
const app = express();
const sneakerRoutes = express.Router();

let Sneaker = require('../model/Shoes');

// api to add sneaker
sneakerRoutes.route('/add').post(function (req, res) {
  console.log("AQUI!")
  console.log(req.body)
  let sneaker = new Sneaker(req.body);
  sneaker.save()
  .then(sneaker => {
    res.status(200).json({'status': 'success','mssg': 'sneaker added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get sneakers
sneakerRoutes.route('/').get(function (req, res) {
  Sneaker.find(function (err, sneakers){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','sneakers': sneakers});
    }
  });
});

// api to get sneaker
sneakerRoutes.route('/sneaker/:id').get(function (req, res) {
  let id = req.params.id;
  Sneaker.findById(id, function (err, sneaker){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','sneaker': sneaker});
    }
  });
});

// api to update route
sneakerRoutes.route('/update/:id').put(function (req, res) {
    Sneaker.findById(req.params.id, function(err, sneaker) {
    if (!sneaker){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        sneaker.name = req.body.name;
        sneaker.brand = req.body.brand;
        sneaker.size = req.body.size;

        sneaker.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
sneakerRoutes.route('/delete/:id').delete(function (req, res) {
  Sneaker.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = sneakerRoutes;