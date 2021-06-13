const { Purchase, Product } = require('../models');

const index = async (req, res) => {
  try {
    const purchases = await Purchase.findAll();
    return res.status(201).send(purchases);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
   const { quantity, productId, providerId } = req.body;
   const { userId } = req;
   const product = await Product.findByPk(productId);
   const newQuantityProduct = product.quantity - quantity;
   if (newQuantityProduct < 0) throw new Error('Invalid quantity');
   await Product.update({ quantity: newQuantityProduct }, { where: { id: productId } });
   const purchase = await Purchase.create({
      quantity,
      productId,
      providerId,
      createBy: userId,
   });
   return res.status(201).json(purchase);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = await Purchase.findByPk(id);
    return res.status(200).json(purchase);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { quantity, productId, providerId } = req.body;
    const { id } = req.params;
    const updatedPurchase = await Purchase.update(
      { quantity, productId, providerId },
      { where: { id } },
    );
    if (!updatedPurchase) {
      throw new Error('Purchse not found');
    }
    return res.status(200).json({ success: 'Purchase updated successfully' });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

module.exports = { index, create, show, update };
