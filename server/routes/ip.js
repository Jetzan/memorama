// backend/routes/ip.js
const express = require('express');
const router = express.Router();
const ipWifi = require('../ip'); // importamos el archivo que creaste antes

router.get('/ip', (req, res) => {
  res.json({ ip: ipWifi });
});

module.exports = router;