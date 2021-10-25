const { Client, Product } = require('../models');

const index = async (req, res) => {
  try {
    const clients = await Client.findAll();
    return res.status(200).send(clients);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
   const { name, email, phoneNumber, clientAddress } = req.body;
  
   const client = await Client.create({
      name, 
      email, 
      phoneNumber, 
      clientAddress
   });
   return res.status(201).json(client);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { index, create };
