const Cirurgia = require('../models/Cirurgias');

exports.createCirurgias = async (req, res) => {
    const { animalId, data, horario, motivo, observacoes } = req.body;
  try {
    const novoCirurgia = await Animal.create({ animalId, data, horario, motivo, observacoes });
    res.status(201).json(novoCirurgia);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
