const CategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    name: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  });

  Category.associate = (models) => {
    Category.hasOne(models.Product,
      { foreignKey: 'categoryId', as: 'category' });
  };

  return Category;
};

module.exports = CategoryModel;
