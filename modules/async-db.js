"use strict";

require('dotenv').config();

const mysql = require('mysql');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'circleci',
    database: 'mouWorks'
});

let query = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                // 執行 sql 腳本對資料庫進行讀寫
                connection.query(sql, values, ( err, rows) => {

                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    // connection.release()  // 結束會話
                    connection.destroy()  // 結束會話 - use this otherwise CI hangs forever
                })
            }
        });
    })
}

module.exports = { query }