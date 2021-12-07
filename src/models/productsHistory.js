module.exports = (sequelize, DataTypes) => {
  const ProductsHistory = sequelize.define('ProductsHistory', {
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    originalId: DataTypes.DOUBLE
  },
  {
    timestamps: true,
    tableName: 'ProductsHistory',
    underscored: false,
  });

  return ProductsHistory;
};
 