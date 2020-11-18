var fs = require('fs');
var _ = require('lodash');

const dataPath = './data/products.json';

const readFile = (
  callback,
  returnJson = false,
  filePath = dataPath,
  encoding = 'utf8'
) => {
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
      throw err;
    }

    callback(returnJson ? JSON.parse(data) : data);
  });
};

const writeFile = (
  fileData,
  callback,
  filePath = dataPath,
  encoding = 'utf8'
) => {
  fs.writeFile(filePath, fileData, encoding, (err) => {
    if (err) {
      throw err;
    }

    callback();
  });
};

const filterArray = (array, filters) => {
  const filterKeys = Object.keys(filters);
  return array.filter((item) => {
    return filterKeys.every((key) => {
      if (typeof filters[key] !== 'function') return true;
      return filters[key](item[key]);
    });
  });
};

const sortArray = (array, type) => {
  const sortedData = _.sortBy(array, 'price');
  if (type === 'asce') {
    return sortedData;
  } else if (type === 'desc') {
    _.reverse(sortedData);
    return sortedData;
  }
};

module.exports = { writeFile, readFile, filterArray, sortArray };
