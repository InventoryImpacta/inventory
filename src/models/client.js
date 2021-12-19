const ClientModel = (sequelize, DataTypes) => {
  const Client = sequelize.define("Client", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  });

  Client.associate = (models) => {
    Client.hasOne(models.Address,
      { foreignKey: 'clientAddress', as: 'address' });
  };

  return Client;
};

module.exports = ClientModel;
