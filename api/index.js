const express = require('express');
const LinkController = require('./controllers/LinkController');

const router = express.Router();

router.post('/c', LinkController.storeLink);

router.get('/a/:id' , LinkController.indexAnalyticsLink);

router.post('/l/visit/:id' , LinkController.storePageVisit)

module.exports = router;
