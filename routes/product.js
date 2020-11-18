var express = require('express');
var router = express.Router();
var util = require('../utils');

/* GET Product listing. */

router.get('/', function (req, res, next) {
  // res.send('respond with a resource');
  util.readFile((data) => {
    console.log(req.query);
    if (Object.keys(req.query).length) {
      const filters = {};
      if (req.query.os && req.query.os.length)
        filters.os = (os) => req.query.os.includes(os);
      if (req.query.storage && req.query.storage.length)
        filters.storage = (storage) => req.query.storage.includes(storage);
      if (req.query.memory && req.query.memory.length)
        filters.memory = (memory) => req.query.memory.includes(memory);
      if (req.query.price_gt && req.query.price_gt.length)
        filters.price = (price) => req.query.price_gt < price;
      if (req.query.price_st && req.query.price_st.length)
        filters.price = (price) => req.query.price_st > price;
      const result = util.filterArray(data, filters);
      // console.log(result);
      if (req.query.sortby) {
        console.log(req.query.sortby);
        const temp = util.sortArray(result, req.query.sortby);
        res.send({ data: temp, length: temp.length });
      } else {
        res.send({ data: result, length: result.length });
      }
    } else {
      res.send({ data, length: data.length });
    }
  }, true);
});

// UPDATE
router.put('/:id/buy', (req, res) => {
  util.readFile((data) => {
    if (req.body.count && req.params.id) {
      const index = data.findIndex((product) => product.id === req.params.id);
      if (index !== -1) {
        console.log(data[index].stock);
        if (data[index].stock) {
          data[index].stock = data[index].stock - 1;
          util.writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(data[index]);
          });
        } else {
          res.status(404).send('Out Of Stock');
        }
      }
    } else {
      res.status(400).send('Bad Request');
    }
  }, true);
});

// router.post('/:id', (req, res) => {
//   util.readFile((data) => { }
// });

module.exports = router;
