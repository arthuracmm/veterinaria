const express = require('express');
const router = express.Router();
const cirurgiaController = require('../controllers/cirurgiaController');

router.post('/', cirurgiaController.createCirurgia);
router.get('/', cirurgiaController.getAllCirurgias);
router.get('/:id', cirurgiaController.getCirurgiaById);
router.put('/:id', cirurgiaController.updateCirurgia);
router.delete('/:id', cirurgiaController.deleteCirurgia);

module.exports = router;
