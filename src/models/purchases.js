const PurchasesModel = (sequelize, DataTypes) => {
  const Purchase = sequelize.define("Purchase", {
    quantity: DataTypes.INTEGER,
  });

  Purchase.associate = (models) => {
    Purchase.belongsTo(models.User,
      { foreignKey: 'createBy', as: 'seller' });
    Purchase.belongsTo(models.Product,
      { foreignKey: 'productId', as: 'product' });
    Purchase.belongsTo(models.Provider,
      { foreignKey: 'providerId', as: 'provider' });
  };

  return Purchase;
};

module.exports = PurchasesModel;
