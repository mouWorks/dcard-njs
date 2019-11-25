"use strict";

module.exports = {

    check: function (req, res){

        const db = require('../modules/async-db');
        let message = 'You are visiting dCard Check Page';
        res.send(message);
    },

    getTimeStamp: function(){

        const moment = require('moment');
        const dateTime = Date.now();
        const timestamp = Math.floor(dateTime);
        let nowTimeStamp =  moment(timestamp).format('YYYY-MM-DDTHH:mm:ss.SSS');

        return nowTimeStamp;
    },

    getOneMinAgo : function(){

        const moment =  require('moment');
        const aMinAgo = new Date( Date.now() - 1000 * 60 );
        let aMonAgoTimeStamp = moment(aMinAgo).format('YYYY-MM-DDTHH:mm:ss.SSS');

        return aMonAgoTimeStamp;
    },

    exceedLimit: function(times, rules){
        return times >= rules;
    },

    demoServer: async function(req, res){
        let rules = 60;
        let ver = '0005';
        let message = ver + " This is Dcard project Demo 11/25 <br>";

        let ip  = req.header('x-forwarded-for') || req.connection.remoteAddress;

        let nowTimeStamp = this.getTimeStamp();
        let aMonAgoTimeStamp = this.getOneMinAgo();

        message += 'Your IP is ' + ip + '<br>';
        message += 'Timestamp: ' + nowTimeStamp;
        message += "<br/>============================<br/>";

        //反查 1分鐘內 Ip 被記錄了幾次
        let visitedTimes = await this.getIpcount(ip, aMonAgoTimeStamp).catch(error => {
            // console.log(error);
            message += "Error when calculating Previous visit! check DB connection";
            res.send(message);
            return;
        });

        if(this.exceedLimit(visitedTimes, rules)){
            message += '<br/>Exceed Time Limit !!';
            res.send(message);
            return;
        }

        //紀錄你的Ip, 以及當下timeStamp
        let recordIpResult = await this.recordIp(ip, nowTimeStamp);

        //Error case: if sth wrong
        if( ! recordIpResult){
            message += "Error During Recording your IP ! check DB connection";
            res.send(message);
            return;
        }

        //SuccessCase;
        message += "You Visited " +  visitedTimes  + " times within 60 secs";
        res.send(message);
        return;

    },

    recordIp: async function(ip, timestamp){

        console.log('Recording Current IP: ' + ip);
        const db = require('../modules/async-db');

        let query = "INSERT INTO `dcard-log` SET ?";
        let values = {
            ip: ip,
            queryString: '/demo',
            timestamp: timestamp,
            status: '200'
        };

        let result = await db.query(query, values).catch(error => {
            console.log(error);
            return false;
        });

        return result;
    },

    getIpcount: async function(ip, timestamp){

        const db = require('../modules/async-db');

        let query = "SELECT COUNT(id) as Times FROM `dcard-logs` WHERE ip = ? AND timestamp > ? AND queryString = ?";
        let values = [
            ip, timestamp, '/demo'
        ];

        // let result = await db.query(query, values);

        let result = await db.query(query, values).catch(error => {
            // throw new Error(error);
            console.log(error);
            return false;
        });

        return result[0].Times;
    },

}//end of module exports
