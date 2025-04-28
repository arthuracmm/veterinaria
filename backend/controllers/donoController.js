const Dono = require('../models/Donos');

exports.createDonos = async (req, res) => {
    const { nome, telefone, email, endereco, cpf } = req.body;
  try {
    const novoDono = await Animal.create({ nome, telefone, email, endereco, cpf });
    res.status(201).json(novoDono);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
