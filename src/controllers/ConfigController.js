const express = require('express');
const router = express.Router();

version = async (req, res) => {
  res.send({ 
    name: 'API AAMT',
    description: 'support application to combat endemics',
    version: '0.1'
  });
}

router.get('/', version);

module.exports = app => app.use('/', router);