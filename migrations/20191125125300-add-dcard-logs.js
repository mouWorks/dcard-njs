'use strict';

var dbm;
var type;
var seed;

const TABLE = 'dcard-logs';

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
    return db.createTable(TABLE, {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        ip: 'string',
        queryString: 'string',
        status: 'string',
        timestamp: 'string',
    });
};

exports.down = function(db) {
    return db.dropTable(TABLE);
};

exports._meta = {
    "version": 1
};
