const CategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    name: DataTypes.STRING,
  });

  Category.associate = (models) => {
    Category.belongsTo(models.User,
      { foreignKey: 'createBy', as: 'user' });
    Category.hasOne(models.Product,
      { foreignKey: 'categoryId', as: 'category' });
  };

  return Category;
};

module.exports = CategoryModel;
