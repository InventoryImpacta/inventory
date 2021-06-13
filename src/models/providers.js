module.exports = (sequelize, DataTypes) => {
  const Provider = sequelize.define('Provider', {
    name: DataTypes.STRING,
    corporateName: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
  },
  {
    timestamps: true,
    tableName: 'Providers',
    underscored: false,
  });

  Provider.associate = (models) => {
    Provider.hasOne(models.Purchase,
      { foreignKey: 'providerId', as: 'provider' });
    Provider.belongsTo(models.Address,
      { foreignKey: 'providerAddress', as: 'address' });
  };

  return Provider;
};
