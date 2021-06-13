const SaleModel = (sequelize, DataTypes) => {
  const Sale = sequelize.define("Sale", {
    quantity: DataTypes.INTEGER,
    paymentMethod: DataTypes.STRING,
    installments: DataTypes.STRING,
    notes: DataTypes.STRING,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.Client,
      { foreignKey: 'clientId', as: 'client' });
      Sale.belongsTo(models.User,
      { foreignKey: 'sellerId', as: 'seller' });
  };

  return Sale;
};

module.exports = SaleModel;
