const { Purchase, Provider, Product, PurchaseProduct,ProductsHistory} = require('../models');
const index = async (req, res) => {
  try {
    const purchases = await Purchase.findAll();
    const purchaseProducts = await PurchaseProduct.findAll()
    const products = await Product.findAll();
    const providers = await Provider.findAll();
    var productsHistory = await ProductsHistory.findAll()
    productsHistory = productsHistory.sort(function(a,b) {return (b.createdAt > a.createdAt) ? 1 : ((a.createdAt > b.createdAt) ? -1 : 0);} );
    

    newPurchases = []

    purchases.map(s => {
      let ns = { ...s.dataValues }
      ns['products'] = []
      ns['provider'] = {}

      let provider = providers.find(c => c.dataValues.id == parseInt(s.providerId))
      if(provider)
      ns.provider = provider.dataValues

      purchaseProducts.map(sp => {
        if(sp.purchaseId == s.id) {
          let product = products.find(p => p.id == sp.productId)
          let prodHistory = productsHistory.find(p => {
            if(p.originalId == sp.productId) {
              if(s.createdAt > p.createdAt) {
                return p
              }
            }
          })
          ns.products.push({
            'product': product.dataValues,
            'quantity': sp.quantity,
            'prodHistory': prodHistory
          })

        
        }
      })

      newPurchases.push(ns)
    })

    return res.status(200).send(newPurchases);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const create = async (req, res) => {
  try {
   const { products, providerId } = req.body;
   const { userId } = req;

      const purchase = await Purchase.create({
          providerId,
          createBy: userId,
      });
      
      products.map(async (p) => {
          let product = await Product.findByPk(p.id);
          
          if(!product) {
            if(!p.name) {
              return res.status(500).json({ error: "NEW_PRODUCT_NO_NAME" });
            } else {
              product = await Product.create({
                name: p.name,
                price: p.price,
                quantity: 0,
                categoryId: p.categoryId,
              });
            }
          }
          const newQuantityProduct = product.quantity + p.quantity;
        
          await Product.update({ quantity: newQuantityProduct }, { where: { id: product.id } });
          
          await PurchaseProduct.create({productId: product.id, quantity: p.quantity, purchaseId: purchase.id})
      })
      
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
