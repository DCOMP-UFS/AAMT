const express = require('express');
const router = express.Router();

version = async (req, res) => {
  res.send({ 
    name: 'API AAMT',
    description: 'support application to combat endemic diseases',
    version: 'v1.20210322'
  });
}

router.get('/', version);

module.exports = app => app.use('/', router);