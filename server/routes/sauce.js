const sauceController = require("../controllers/sauces");
const auth = require('../middleware/auth.js');
const multer = require('../middleware/multer-config');

const express = require("express");
const router = express.Router();

router.post('/', auth, multer, sauceController.createSauce);

router.put('/:id', auth, multer, sauceController.modifySauce);
router.put('/:id/like', auth, multer, sauceController.reactToSauce);

router.delete('/:id', auth, multer, sauceController.deleteSauce);
router.get('/:id', auth, sauceController.getOneSauce);
router.get('/', auth, sauceController.getAllSauces);

module.exports = router;
