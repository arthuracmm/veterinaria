const express = require('express');
const router = express.Router();
const donoController = require('../controllers/donoController');

router.post('/', donoController.createDono);
router.get('/', donoController.getAllDonos);
router.get('/:id', donoController.getDonoById);
router.put('/:id', donoController.updateDono);
router.delete('/:id', donoController.deleteDono);

module.exports = router;
