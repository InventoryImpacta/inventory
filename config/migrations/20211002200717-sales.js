'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('Sales', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: 'int'
    },
    quantiy: {
      type: 'string',
      allowNull: false,
    },
    clientId: {
      type: 'int',
      references: {
        model: 'Clients',
        key: 'id'
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    sellerId: {
      type: 'string',
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    },
    paymentMethod: {
      type: 'string',
      allowNull: false,
    },
    installments: {
      allowNull: false,
      type: 'string'
    },
    notes: {
      allowNull: false,
      type: 'string'
    },
    createdAt: {
      allowNull: false,
      type: 'date'
    },
    updatedAt: {
      allowNull: false,
      type: 'date'
    }
  });
};

exports.down = function(db) {
  return db.dropTable('Sales');
};

exports._meta = {
  "version": 1
};
