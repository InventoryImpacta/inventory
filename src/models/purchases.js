const PurchasesModel = (sequelize, DataTypes) => {
  const Purchase = sequelize.define("Purchase", {
    quantity: DataTypes.INTEGER,
    cost: DataTypes.DOUBLE,
  });

  Purchase.associate = (models) => {
    Purchase.belongsTo(models.Product,
      { foreignKey: 'productId', as: 'product' });
    Purchase.belongsTo(models.Provider,
      { foreignKey: 'providerId', as: 'provider' });
  };

  return Purchase;
};

module.exports = PurchasesModel;
