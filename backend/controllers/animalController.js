const Animal = require('../models/Animal');

exports.createAnimal = async (req, res) => {
  const { nome, especie, raca, idade, peso, donoId } = req.body;
  try {
    const novoAnimal = await Animal.create({ nome, especie, raca, idade, peso, donoId });
    res.status(201).json(novoAnimal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
