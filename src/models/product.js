module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    quantity: DataTypes.DOUBLE,
    unity: DataTypes.STRING,
    sizes: DataTypes.STRING,
  },
  {
    timestamps: true,
    tableName: 'Products',
    underscored: false,
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Category,
      { foreignKey: 'categoryId' });
    Product.belongsTo(models.User,
      { foreignKey: 'createBy', as: 'userId' });
    Product.hasOne(models.Purchase,
      { foreignKey: 'productId', as: 'product' });
  };

  return Product;
};
