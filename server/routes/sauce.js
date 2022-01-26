const sauceController = require("../controllers/sauces");
const auth = require('../middleware/auth.js');
const multer = require('../middleware/multer-config');

const express = require("express");
const router = express.Router();

router.get('/', sauceController.getAllSauces);
router.get('/:id', auth, sauceController.getOneSauce);
router.post('/', auth, multer, sauceController.createSauce);

module.exports = router;
