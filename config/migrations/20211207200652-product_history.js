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
  return db.createTable('ProductsHistory', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: 'int'
    },
    originalId: {
      allowNull: false,
      type: 'int'
    },
    name: {
      type: 'string',
      allowNull: false
    },
    price: {
      type: 'double',
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: 'datetime'
    },
    updatedAt: {
      allowNull: false,
      type: 'datetime'
    }
  });
};

exports.down = function(db) {
  return db.dropTable('ProductsHistory');
};

exports._meta = {
  "version": 1
};
