const Cirurgia = require('../models/Cirurgias');

exports.createCirurgias = async (req, res) => {
  const { animalId, data, tipo, veterinarioResponsavel, observacoes } = req.body;
  try {
    const novoCirurgia = await Animal.create({ animalId, data, tipo, veterinarioResponsavel, observacoes });
    res.status(201).json(novoCirurgia);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
