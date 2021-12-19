module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    quantity: DataTypes.DOUBLE,
    isActive: DataTypes.BOOLEAN
  },
  {
    timestamps: true,
    tableName: 'Products',
    underscored: false,
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Category,
      { foreignKey: 'categoryId', as: 'category' });
    Product.hasOne(models.Purchase,
      { foreignKey: 'productId', as: 'product' });
  };

  return Product;
};
