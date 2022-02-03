const sauceController = require("../controllers/sauces");
const auth = require('../middleware/auth.js');
const multer = require('../middleware/multer-config');

const express = require("express");
const router = express.Router();

router.post('/', auth, multer, sauceController.createSauce); // multer for image uploading

router.put('/:id', auth, multer, sauceController.modifySauce); // multer for image modif
router.post('/:id/like', auth, sauceController.reactToSauce);

router.delete('/:id', auth, sauceController.deleteSauce);
router.get('/:id', auth, sauceController.getOneSauce);
router.get('/', auth, sauceController.getAllSauces);

module.exports = router;
