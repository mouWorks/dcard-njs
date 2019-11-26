"use strict";

const redis = require('redis');

let redisSet = function( key, values ) {

    const client = redis.createClient();

    return new Promise(( resolve, reject ) => {

        client.set(key, values, 'EX', 60, ( err, reply) => {

            if ( err ) {
                reject( err )
            } else {
                resolve( reply )
            }
            client.quit();
        });
    })
};

let redisGet = function( key ) {

    const client = redis.createClient();

    return new Promise(( resolve, reject ) => {

        client.get(key, ( err, reply) => {

            if ( err ) {
                reject( err )
            } else {
                resolve( reply )
            }
            client.quit();
        });
    })
};

let redisKeys = function( key ) {

    const client = redis.createClient();

    let target = '*' + key + '*';
    return new Promise(( resolve, reject ) => {

        client.keys(target, (err, replies) => {

            if ( err ) {
                reject( err )
            } else {
                resolve( replies )
            }
            client.quit();
        });
    })
};


module.exports = { redisSet, redisGet, redisKeys }