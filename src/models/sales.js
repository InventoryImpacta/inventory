const SaleModel = (sequelize, DataTypes) => {
  const Sale = sequelize.define("Sale", {
    paymentMethod: DataTypes.STRING,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.Client,
      { foreignKey: 'clientId', as: 'client' });
  };

  return Sale;
};

module.exports = SaleModel;
