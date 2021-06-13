module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    name: DataTypes.STRING,
    corporateName: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    contact: DataTypes.STRING,
    address: DataTypes.STRING,
    cep: DataTypes.STRING,
  },
  {
    timestamps: true,
    tableName: 'Providers',
    underscored: false,
  });

  Provider.associate = (models) => {
    Provider.belongsTo(models.User,
      { foreignKey: 'createBy', as: 'user' });
    Provider.hasOne(models.Purchase,
      { foreignKey: 'providerId', as: 'provider' });
  };

  return Provider;
};
