const { Sale, Product, SalesProduct, Client } = require('../models');

const index = async (req, res) => {
  try {
    const sales = await Sale.findAll();
    const saleProducts = await SalesProduct.findAll()
    const products = await Product.findAll();
    const clients = await Client.findAll();

    newSales = []

    sales.map(s => {
      let ns = { ...s.dataValues }
      ns['products'] = []
      ns['client'] = {}

      let client = clients.find(c => c.dataValues.id == parseInt(s.clientId))
      if(client)
      ns.client = client.dataValues

      saleProducts.map(sp => {
        if(sp.saleId == s.id) {
          let product = products.find(p => p.id == sp.productId)
          ns.products.push({
            'product': product.dataValues,
            'quantity': sp.quantity
          })

        
        }
      })

      newSales.push(ns)
    })

    return res.status(200).send(newSales);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
   const { clientId, products, paymentMethod } = req.body;

   const sale = await Sale.create({
      clientId,
      paymentMethod,
      isSaleCompleted: false  
   });


   products.map(async (p) => {
      let product = await Product.findByPk(p.id);

      if(!product) {
        throw new Error('Product doesnt exist');
      }
      const newQuantityProduct = product.quantity - p.quantity;
      if (newQuantityProduct < 0) throw new Error('Invalid quantity');
      await Product.update({ quantity: newQuantityProduct }, { where: { id: p.id } });
      
      await SalesProduct.create({productId: p.id, quantity: p.quantity, saleId: sale.id})
  })


   return res.status(201).json(sale);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { index, create };
